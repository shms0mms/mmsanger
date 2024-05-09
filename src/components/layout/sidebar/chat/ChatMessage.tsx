import UserAvatar from "@/app/user/all/UserAvatar"
import { EnumStatus } from "@/types/auth"
import { MessageResponse } from "@/types/chat"
import { FC } from "react"
export interface IChatMessage extends MessageResponse {
	isMe?: boolean
}
const ChatMessage: FC<IChatMessage> = ({
	message,
	isMe,
	user: { id, firstName, secondName, imageURL, status },
}) => {
	return (
		<div
			className={`flex flex-col-reverse w-full gap-1 ${!isMe && "items-end"}`}
		>
			<div
				className={`flex items-start max-w-[66%] gap-2 ${!isMe &&
					"flex-row-reverse"}`}
			>
				<UserAvatar
					statusClassName="w-2 h-2 top-0 right-0"
					id={id}
					imageURL={imageURL}
					status={"offline" as EnumStatus}
				/>
				<div className="bg-secondary rounded-sm p-2 break-all ">{message}</div>
			</div>
			<span className="text-xs opacity-30">
				{firstName} {secondName}
			</span>
		</div>
	)
}

export default ChatMessage
