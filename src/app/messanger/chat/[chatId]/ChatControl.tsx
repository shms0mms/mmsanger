import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input/input"
import { ICON_SIZE } from "@/constants/icon-size.constants"
import { ReactFunc } from "@/types/app"
import { Message } from "@/types/chat"
import { Loader2, Send } from "lucide-react"
import { FC, ForwardedRef, RefObject, forwardRef } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"

export interface IChatControl {
	sendMessage: (msg: Omit<Message, "createdAt">) => void
	isLoading?: boolean
	chatId: string
	userId: number
}
interface FormData {
	message: string
}
const ChatControl = forwardRef(function ChatControl(
	{ sendMessage, isLoading, userId, chatId }: IChatControl,
	ref: ForwardedRef<HTMLDivElement>
) {
	const { register, handleSubmit, updateField, fields } = useForm<FormData>({
		withLocalStorage: [],
	})
	const onSubmit: OnSubmitHandler<FormData> = async data => {
		await sendMessage({ message: data.message, chatId, userId })
		updateField("message", {
			...fields.message,
			value: "",
		})
	}
	return (
		<Form
			handleSubmit={handleSubmit}
			className="flex items-center gap-3 h-[40px]"
			onSubmitHandler={onSubmit}
		>
			<Input
				autoComplete="off"
				placeholder="Введите сообщение..."
				name={"message"}
				register={register}
			/>
			<Button disabled={isLoading} size={"icon"}>
				{isLoading ? (
					<Loader2 className="animate-spin" />
				) : (
					<Send width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
				)}
			</Button>
		</Form>
	)
})

export default ChatControl
