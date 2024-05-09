"use client"
import { METHODS } from "@/constants/methods.constants"
import { useMutation } from "@apollo/client"
import { FC, useEffect } from "react"
import { useForm, Form as NextForm, OnSubmitHandler } from "react-mms-form"
import UpdateUser from "@/schemas/user/UpdateUser.graphql"
import { User } from "@/types/auth"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/Loader"
import styles from "./settings.module.scss"
import { Input } from "@/components/ui/input/input"
import { ERRORS } from "@/constants/errors.constants"
import { DEFAULT_USER_IMAGE_URL, EMAIL_REGEXP } from "@/constants/main"
import Title from "@/components/ui/Title"
import useAuth from "@/hooks/useAuth"
import { Textarea } from "@/components/ui/input/textarea"
import ProfileImageFile from "@/components/ui/input/ProfileImageFile"

interface FormData extends Omit<User, "password"> {}
const Form: FC = ({}) => {
	const { getCurrentUser } = useAuth()
	const currentUser = getCurrentUser.data?.getCurrentUser || {}
	useEffect(() => {
		getCurrentUser.query()
	}, [])
	const {
		handleSubmit,
		register,
		formState: { errors },
		updateField,
		fields
	} = useForm<FormData>({
		withLocalStorage: [
			"description",
			"email",
			"firstName",
			"secondName",
			"username",
		],
		withStorageMode: 'onSubmit'
	})

	const [mutate, { data: user, loading, error }] = useMutation(UpdateUser)
	const onSubmit: OnSubmitHandler<FormData> = data => {
		const {imageURL, ..._data} = data
		mutate({
			variables: {
				user: _data,
			},
		})
		
		if(error === undefined && !loading) 
			toast("Данные успешно изменены")
	}

	return (
		<NextForm
			handleSubmit={handleSubmit}
			onSubmitHandler={onSubmit}
			method={METHODS.POST}
			className="flex flex-col h-full w-full items-end"
		>
			<div className={styles.rows}>
				<Title>Редактирование профиля</Title>

			<ProfileImageFile 
				value={currentUser.imageURL || DEFAULT_USER_IMAGE_URL} register={register}
			 	name={"imageURL"} error={errors.imageURL} 
				changeValue={(value) => updateField("imageURL", {...fields.imageURL, value})} 
			 />

				<div className={styles.col}>
					<Input
						error={errors.username}
						register={register}
						params={{
							minLength: { value: 8, message: ERRORS.minLengthMustBe8 },
						}}
						placeholder="Ваш логин"
						name={"username"}
					/>
					<Input
						error={errors.email}
						params={{
							regex: { value: EMAIL_REGEXP, message: ERRORS.emailNotValid },
						}}
						register={register}
						placeholder="Ваш email"
						name={"email"}
					/>
				</div>
				<div className={styles.col}>
					<Input
						error={errors.firstName}
						register={register}
						placeholder="Ваше имя"
						name={"firstName"}
					/>
					<Input
						error={errors.secondName}
						register={register}
						placeholder="Ваша фамилия"
						name={"secondName"}
					/>
				</div>
				<div className={styles.col}>
					<Textarea
						error={errors.description}
						register={register}
						placeholder="Описание профиля"
						name={"description"}
						className="min-h-[60px] max-h-[200px]"
					/>
				</div>
			</div>

			<Button type="submit">{loading ? <Loader /> : "Сохранить поля ввода"}</Button>
		</NextForm>
	)
}

export default Form
