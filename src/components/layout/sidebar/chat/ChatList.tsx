/* eslint-disable react-hooks/exhaustive-deps */
import {  Context, FC,  useContext,  useEffect, useState } from "react"
import styles from "../sidebar.module.scss"
import { useQuery } from "@apollo/client"
import GetAllChats from "@/schemas/chat/GetAllChats.graphql"
import ChatSkeleton from "./ChatSkeleton"
import Link from "next/link"
import { ROUTES } from "@/constants/routes.constants"
import ChatItem from "./ChatItem"
import { Chat, MessageResponse } from "@/types/chat"
import { IChat } from "./Chat"
import useSearchParams from "@/hooks/useSearchParams"
import { cn } from "@/lib/utils"
import useChats from "@/hooks/useChats"
import { TUsersContext, UsersContext } from "@/providers/UsersProvider"
import { MessageContext, TMessageContext } from "@/providers/MessageProvider"
const ChatList: FC<IChat> = ({authUserId}) => {
	const { get } = useSearchParams()
	const { data, loading } = useQuery(GetAllChats, {
		variables: {
			searchTerm: get('chatSearchTerm') ?? ""
		}
	})
	const [windowHeight, setWindowHeight] = useState(0)
	const { lastMessage } = useChats()
	const {lastMessage: status} = useContext(UsersContext as Context<TUsersContext>)
	const {lastMessage: message} = useContext(MessageContext as Context<TMessageContext>)
	const [chats, setChats] = useState<Chat[]>([])
	const _chats = data?.getAllChats
	
	useEffect(() => {
		if (_chats)	setChats(_chats)
	}, [_chats?.length])
	
	useEffect(() => {
		
		if (message?.chatId && chats.some(c => c.id === message?.chatId)) {
			
			setChats(state => {
				const _state = structuredClone(state)

				const chatIndex = _state.findIndex(s => s.id === message.chatId)
				
				_state[chatIndex].messages[_state[chatIndex].messages.length - 1] = message

				return _state
			})
		}
		if (status?.userId && chats.some(c => c.users.some(u => u.id === status.userId))) {
			setChats(state => {
				const _state = structuredClone(state)
				const chatIndex = _state.findIndex(s => s.users.some(u => u.id === status.userId))
				const users = _state[chatIndex].users
				const userIndex = users.findIndex(u => u.id === status.userId)
				users[userIndex].status = status.status


				
				return [..._state]
			})	
		}
		if (lastMessage?.id && chats.some(c => c.id === lastMessage?.id)){
			
			setChats(state => {
				const _state = structuredClone(state)
				const chatIndex = _state.findIndex(s => s.id === lastMessage?.id)
				
				if (chatIndex !== -1) _state[chatIndex] = lastMessage

				return [..._state]
			})
		}
		if (lastMessage?.id && lastMessage?.users?.some(u => +u.id === authUserId)) {
			setChats(state => [...state, lastMessage])
		}
	}, [lastMessage, status, message])
	useEffect(() => {
		setWindowHeight(window.innerHeight)
	}, [])

	const skeletons = Array.from(
		{ length: windowHeight / 48 / 1.6 },
		(_, index) => <ChatSkeleton key={index} />
	)
	
	return (
		<div className={cn(`${styles["chat-list"]}`)}>
			<div className={`flex -z-10 flex-col gap-5 transition-all h-full duration-300 ease-in-out absolute top-0 left-0 ${loading && !data?.getAllChats?.length ? 'opacity-100' : 'opacity-0'}`}>
				{skeletons}
			</div>
			{chats.length ? (
				chats.map((c: Chat, pk: number) => <ChatItem pk={pk+1} authUserId={authUserId} key={c.id} {...c} />)
			) : !loading &&  (
				<Link href={ROUTES.finder} className="text-sm h-full items-center text-center justify-center flex flex-col gap-2">
						Перейти на страницу поиска собеседников
				</Link>
			)}
		</div>
	)
}

export default ChatList
