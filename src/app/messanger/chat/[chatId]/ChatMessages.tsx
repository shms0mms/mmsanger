import ChatMessage from "@/components/layout/sidebar/chat/ChatMessage"
import Loader from "@/components/ui/Loader"
import { MessageResponse } from "@/types/chat"
import { ForwardedRef, forwardRef } from "react"

export interface IChatMessages {
	messages: MessageResponse[]
	isLoading?: boolean
	authUserId: number
}

const ChatMessages = forwardRef(function ChatMessages(
	{ messages, isLoading, authUserId }: IChatMessages,
	ref: ForwardedRef<HTMLDivElement>
) {
	//mb-[60px] flex-[1_1_auto] h-full
	const isCentered = !messages.length || isLoading

	return (
		<div
			className={`w-full mb-5 max-h-[83vh] min-h-[83vh] ${isCentered &&
				"flex items-center justify-center"}`}
		>
			{messages.length ? (
				<div ref={ref} className="flex max-h-full flex-col gap-5 overflow-auto">
					{messages.map(m => (
						<ChatMessage key={m.id} isMe={m.userId == authUserId} {...m} />
					))}
				</div>
			) : isLoading ? (
				<Loader />
			) : (
				<div>Начните беседу первыми!</div>
			)}
		</div>
	)
})

export default ChatMessages
