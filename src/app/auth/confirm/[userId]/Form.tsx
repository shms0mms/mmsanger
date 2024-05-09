"use client"
import useAuth from "@/hooks/useAuth"
import { FC, useState } from "react"
import { Form as NextForm, OnSubmitHandler, useForm } from "react-mms-form"
import styles from "../../form.module.scss"
import { Button } from "@/components/ui/button"
import { METHODS } from "@/constants/methods.constants"
import Logo from "@/components/ui/Logo"
import Loader from "@/components/ui/Loader"
import Error from "@/components/ui/Error"
import Link from "../../Link"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
const Form: FC = ({}) => {
	const [formError, setFormError] = useState("")
	const {
		isLoading,
		confirmEmail: { query },
	} = useAuth()
	const { userId } = useParams()
	const {
		handleSubmit,
		formState: { isLoading: formLoading },
	} = useForm()
	const onSubmit: OnSubmitHandler = async () => {
		query(+userId)
	}

	return (
		<NextForm
			handleSubmit={handleSubmit}
			method={METHODS.POST}
			onSubmitHandler={onSubmit}
			className={cn(`${styles.form}`)}
		>
			<Logo />
			<Error>{formError}</Error>
			<div className="text-lg font-bold">
				Нажмите на кнопку подтверждения почты, чтобы войти в аккаунт.
			</div>

			<Button size={"sm"} type="submit">
				{isLoading || formLoading ? <Loader /> : "Подтвердить почту"}
			</Button>
		</NextForm>
	)
}

export default Form
