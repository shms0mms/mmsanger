import ChatUsers from "@/components/common/chat/ChatUsers"
import { TUsersContext, UsersContext } from "@/providers/UsersProvider"
import { User } from "@/types/auth"
import { Chat } from "@/types/chat"
import { getCompanions } from "@/utils/chat.utils"
import { Context, FC, useContext, useEffect, useState } from "react"
export interface IChatHeader extends Pick<Chat, "users"> {
	authUserId: number | null
	isLoading?: boolean
}
const ChatHeader: FC<IChatHeader> = ({ users, authUserId, isLoading }) => {
	const [_users, setUsers] = useState<User[]>(getCompanions(users, authUserId))

	const { lastMessage } = useContext(UsersContext as Context<TUsersContext>)
	useEffect(() => {
		setUsers(getCompanions(users, authUserId))
	}, [users.length, authUserId])
	useEffect(() => {
		if (_users.some(u => u.id === lastMessage?.userId)) {
			setUsers(state => {
				const _state = structuredClone(state)
				const userIndex = _state.findIndex(u => u.id === lastMessage.userId)
				_state[userIndex].status = lastMessage.status
				return [..._state]
			})
		}
	}, [lastMessage])
	return (
		<div className="border-b-[1px] border-[0px] border-solid border-b-secondary p-3">
			<ChatUsers isLoading={isLoading} _users={_users} />
		</div>
	)
}

export default ChatHeader
