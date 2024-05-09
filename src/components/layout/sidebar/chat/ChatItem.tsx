import { ROUTES } from "@/constants/routes.constants"
import { Chat } from "@/types/chat"
import Link from "next/link"
import { ExoticComponent, FC,  useEffect, useRef } from "react"
import styles from '../sidebar.module.scss'
import UserAvatar from "@/app/user/all/UserAvatar"
import useSearchParams from "@/hooks/useSearchParams"
import { getCompanions } from "@/utils/chat.utils"
import ChatUsers from "@/components/common/chat/ChatUsers"
export interface IChatItem extends Chat {
	authUserId: number | null
	pk: number
}

const ChatItem: FC<IChatItem> = ({ users, id, authUserId, messages, pk }) => {
	
	const lastMessage = messages?.at(-1) 
	const _users = getCompanions(users, authUserId)
	const {get} = useSearchParams()
	const chatSearchTerm = get('chatSearchTerm') ?? ""
	const ref = useRef<HTMLAnchorElement | null>(null)
	useEffect(() => {
		const current = ref.current
		if (current) {
		current.style.opacity = '0'
				setTimeout(() => {
					current.style.opacity = '1'
				}, 100 * pk);			
		}
	}, [ref.current])
	
	const createdAt = new Date(lastMessage?.createdAt || "").toLocaleTimeString()

	
	return <Link ref={ref} className="transition-all duration-300 border flex items-center justify-between border-solid border-secondary gap-3 rounded-sm p-3" href={`${ROUTES.chat(id)}?chatSearchTerm=${chatSearchTerm}`}>
			<ChatUsers _users={_users}  />

			<div  className="text-xs flex flex-col gap-1 opacity-45 text-ellipsis max-w-[50%] overflow-hidden">
				<span>
					{lastMessage?.message || 'Нажмите чтобы отправить сообщение...'}
				</span>
			{lastMessage !== undefined &&	<span className="text-right text-[10px]">
					{createdAt}
				</span>
				}
			</div>
		
		</Link>
}

export default ChatItem
