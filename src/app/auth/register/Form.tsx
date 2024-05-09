"use client"
import { Input } from "@/components/ui/input/input"
import useAuth from "@/hooks/useAuth"
import { UserCreate } from "@/types/auth"
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
import Link from "../Link"
import { ROUTES } from "@/constants/routes.constants"
import { useRouter } from "next/navigation"
const Form: FC = ({}) => {
	const [formError, setFormError] = useState("")
	const {
		isLoading,
		register: { mutate, data: user },
	} = useAuth()
	
	const {
		handleSubmit,
		register,
		formState: { errors, isLoading: formLoading, isInvalid },
	} = useForm<UserCreate>({
		mode: "onSubmit",
		withLocalStorage: ["email", "password", "username", "firstName", "secondName"],
	})
	const {push} = useRouter()
	const onSubmit: OnSubmitHandler<UserCreate> = async data => {
		
		mutate(data, setFormError)		
		if (!!user?.register?.id) setFormError("")

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
					params={{ required: { value: true, message: ERRORS.required }, minLength: {value: 8, message: ERRORS.minLengthMustBe8} }}
					register={register}
					placeholder="Ваш логин"
					name={"username"}
				/>
			</div>
			<div className={styles.col}>
				<Input
					error={errors.firstName}
					params={{
						required: { value: true, message: ERRORS.required },
					}}
					register={register}
					placeholder="Ваше имя"
					name={"firstName"}
				/>
				<Input
					error={errors.secondName}
					params={{ required: { value: true, message: ERRORS.required } }}
					register={register}
					placeholder="Ваша фамилия"
					name={"secondName"}
				/>
			</div>
			<InputPassword register={register} error={errors.password} />
			<RequiredFields />
			<Error>{formError}</Error>
			<Button size={"sm"} type="submit">
				{isLoading || formLoading ? <Loader /> : "Зарегистрироваться"}
			</Button>
			<Link href={ROUTES.login} text="Уже есть аккаунт?" title="Войти" />
		</NextForm>
	)
}

export default Form
