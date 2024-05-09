"use client"
import { Input } from "@/components/ui/input/input"
import useAuth from "@/hooks/useAuth"
import { UserLogin } from "@/types/auth"
import { FC, useState } from "react"
import { Form as NextForm, OnSubmitHandler, useForm } from "react-mms-form"
import styles from "../form.module.scss"
import { Button } from "@/components/ui/button"
import { METHODS } from "@/constants/methods.constants"
import RequiredFields from "@/components/ui/RequiredFields"
import { ERRORS } from "@/constants/errors.constants"
import Logo from "@/components/ui/Logo"
import { EMAIL_REGEXP } from "@/constants/main"
import Loader from "@/components/ui/Loader"
import InputPassword from "@/components/ui/input/InputPassword"
import Error from "@/components/ui/Error"
import { ROUTES } from "@/constants/routes.constants"
import Link from "../Link"
import { useRouter } from "next/navigation"
const Form: FC = ({}) => {
	const [formError, setFormError] = useState("")
	const {
		isLoading,
		login: { mutate, data: user },
	} = useAuth()
	const {
		handleSubmit,
		register,
		formState: { errors, isLoading: formLoading , isInvalid},
	} = useForm<UserLogin>({
		mode: "onSubmit",
		withLocalStorage: ["email", "password", "username"],
	})
	const onSubmit: OnSubmitHandler<UserLogin> = async data => {
		mutate(data, setFormError)		
		if (!!user?.login?.id) 
			setFormError("")


	}

	return (
		<NextForm
			handleSubmit={handleSubmit}
			method={METHODS.POST}
			onSubmitHandler={onSubmit}
			className={styles.form}
		>
			<Logo />
			<div className={styles.col}>
				<Input
					error={errors.email}
					params={{
						regex: { value: EMAIL_REGEXP, message: ERRORS.emailNotValid },
						required: { value: true, message: ERRORS.required },
					}}
					register={register}
					placeholder="Ваш email"
					name={"email"}
				/>
				<Input
					error={errors.username}
					params={{ required: { value: true, message: ERRORS.required } , minLength: {value: 8, message: ERRORS.minLengthMustBe8}}}
					register={register}
					placeholder="Ваш логин"
					name={"username"}
				/>
			</div>
			<InputPassword register={register} error={errors.password} />
			<RequiredFields />
			<Error>{formError}</Error>
			<Button size={"sm"} type="submit">
				{isLoading || formLoading ? <Loader /> : "Войти"}
			</Button>

			<Link href={ROUTES.register} text="Еще нету аккаунта?" title="Зарегистрироваться" />
 
		</NextForm>
	)
}

export default Form
