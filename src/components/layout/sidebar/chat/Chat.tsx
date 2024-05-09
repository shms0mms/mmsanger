import { FC } from "react"
import ChatHeader from "./ChatHeader"
import ChatList from "./ChatList"
export interface IChat {
	authUserId: null | number
}
const Chat: FC<IChat> = ({ authUserId }) => {
	return (
		<div className="h-full flex flex-col gap-5">
			<ChatHeader />
			<ChatList authUserId={authUserId} />
		</div>
	)
}

export default Chat
