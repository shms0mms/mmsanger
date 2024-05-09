"use client"
import { useLazyQuery, useMutation } from "@apollo/client"
import Auth from "../schemas/auth/Auth.graphql"
import GetCurrentUser from "../schemas/auth/GetCurrentUser.graphql"
import GetNewTokens from "../schemas/auth/GetNewTokens.graphql"
import Login from "../schemas/auth/Login.graphql"
import Register from "../schemas/auth/Register.graphql"
import {
	getAccessToken,
	removeAccessToken,
	removeRefreshToken,
	saveAccessToken,
	saveRefreshToken,
} from "@/utils/auth.utils"
import { ROUTES } from "@/constants/routes.constants"
import { useRouter } from "next/navigation"
import { UserCreate, UserLogin } from "@/types/auth"
import { ReactFunc } from "@/types/app"
import { toast } from "sonner"
import ConfirmEmail from '@/schemas/auth/ConfirmEmail.graphql'
const useAuth = () => {
	const accessToken = getAccessToken()
	const { push } = useRouter()

	const [
		authMutate,
		{ data: userByAuth, loading: authLoading, error: authError },
	] = useMutation(Auth)
	const [loginMutate, { data: userLogin, loading: loginLoading }] = useMutation(
		Login
	)
	const [
		registerMutate,
		{ data: userRegister, loading: registerLoading, error: getNewTokensError },
	] = useMutation(Register)

	const [confirmEmailQuery, {data: confirmEmailData, loading: isConfirmEmailLoading}] = useMutation(ConfirmEmail)
	const [
		getCurrentUserQuery,
		{
			data: currentUser,
			loading: getCurrentUserLoading,
			error: getCurrentUserError,
		},
	] = useLazyQuery(GetCurrentUser)
	const [
		getNewTokensMutate,
		{ data: tokens, loading: getNewTokensLoading },
	] = useMutation(GetNewTokens)

	const getNewTokens = () => {
		const data = getNewTokensMutate({
			onCompleted(data) {
				saveAccessToken(data.getNewTokens.accessToken)
				saveRefreshToken(data.getNewTokens.refreshToken)
			},
			onError() {},
		})
		return data
	}
	const confirmEmail = (userId: number) => {
		confirmEmailQuery({
			onCompleted(data) {
				saveAccessToken(data.confirmEmail.accessToken)
				saveRefreshToken(data.confirmEmail.refreshToken)
				toast.success("Почта успешно подтверждена!")
				push(ROUTES.home)
			},
			variables: {
				userId
			}
		})
	}
	const auth = () => {
		const data = authMutate({
			onError() {
				getNewTokens()
			},
			onCompleted() {},
		})

		return data
	}
	const getCurrentUser = () => {
		const data = getCurrentUserQuery({
			onError() {
				getNewTokens()
			},
			onCompleted(data) {},
		})

		return data
	}
	const login = (user: UserLogin, setFormError?: ReactFunc<string>) => {
		const response = loginMutate({
			onCompleted(data) {
				saveAccessToken(data.login.accessToken)
				saveRefreshToken(data.login.refreshToken)
				toast.success("Вы успешно вошли в аккаунт!")
				push(ROUTES.home)
			},
			onError(err) {
				
				const ext = err?.graphQLErrors[0]?.extensions
				const error = ext?.originalError as Record<string, any>
				const code = error?.statusCode

				if (code && (code === 401 || code === 404)) {
					if (error?.message === "Email or password is incorrect")
						setFormError && setFormError("Пароль или почта неправильные")
					else setFormError && setFormError("Такой пользователь не существует")
				}
			},
			variables: {
				user,
			},
		})

		return response
	}
	const register = (user: UserCreate, setFormError?: ReactFunc<string>) => {
		return registerMutate({
			onCompleted(data) {

				toast.info("Перейдите на вашу почту, и подтвердите её!")
			},
			onError(error) {
					
				const ext = error.graphQLErrors[0]?.extensions
				const code = (ext?.originalError as Record<string, number>)
					?.statusCode as number
				if (code && code === 401)
					setFormError && setFormError("Такой пользователь уже существует")
			},
			variables: {
				user,
			},
		})
	}

	return {
		login: {
			mutate: login,
			data: userLogin,
		},
		auth: {
			mutate: auth,
			data: userByAuth,
			error: authError,
		},
		getCurrentUser: {
			query: getCurrentUser,
			data: currentUser,
			error: getCurrentUserError,
		},
		getNewTokens: {
			mutate: getNewTokens,
			data: tokens,
			error: getNewTokensError,
		},
		register: {
			mutate: register,
			data: userRegister,
		},
confirmEmail: {
	query: confirmEmail,
data: confirmEmailData
},
		isLoading:
			registerLoading ||
			getCurrentUserLoading ||
			getNewTokensLoading ||
			authLoading ||
			loginLoading || isConfirmEmailLoading
	}
}

export default useAuth
