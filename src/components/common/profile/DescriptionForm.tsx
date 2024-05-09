"use client"
import Loader from "@/components/ui/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input/input"
import { ICON_SIZE } from "@/constants/icon-size.constants"
import { User } from "@/types/auth"
import { useMutation } from "@apollo/client"
import { Save } from "lucide-react"
import { FC } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
import UpdateDescription from "@/schemas/user/UpdateDescription.graphql"
import { ReactFunc } from "@/types/app"
import { METHODS } from "@/constants/methods.constants"
import { client } from "@/config/apollo.config"
import GetCurrentUser from "@/schemas/auth/GetCurrentUser.graphql"
interface FormData extends Pick<User, "description"> {}
const DescriptionForm: FC<{ updateEdit: ReactFunc<boolean> }> = ({
	updateEdit,
}) => {
	const { handleSubmit, register } = useForm<FormData>({
		withLocalStorage: [],
	})
	const [mutate, { data, loading, error }] = useMutation(UpdateDescription)
	const onSubmit: OnSubmitHandler<FormData> = async data => {
		mutate({
			variables: {
				description: data.description || "",
			},
		})

		error === undefined && updateEdit(false)
		error === undefined &&
			(await client.refetchQueries({
				include: [GetCurrentUser],
			}))
	}
	return (
		<Form
			method={METHODS.POST}
			className="flex items-center gap-1"
			handleSubmit={handleSubmit}
			onSubmitHandler={onSubmit}
		>
			<Input name={"description"} register={register} />
			<Button size={"sm"}>
				{loading ? (
					<Loader />
				) : (
					<Save width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
				)}
			</Button>
		</Form>
	)
}

export default DescriptionForm
