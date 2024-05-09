/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import useChat from "@/hooks/useChat"
import { Message, MessageResponse } from "@/types/chat"
import { useParams } from "next/navigation"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import ChatControl from "./ChatControl"
import ChatMessages from "./ChatMessages"
import {  useQuery } from "@apollo/client"
import GetLastMessages from "@/schemas/chat/GetLastMessagesByChatId.graphql"
import GetChatByChatId from '@/schemas/chat/GetChatByChatId.graphql'
import GetCurrentUser from '@/schemas/auth/GetCurrentUser.graphql'
import ChatHeader from "./ChatHeader"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { ICON_SIZE } from "@/constants/icon-size.constants"
export const revalidate = 900
const ChatDetail: FC = ({}) => {
	const {data: currentUser, loading: isCurrentUserLoading}  = useQuery(GetCurrentUser) 
	const { chatId } = useParams()
	const { loading: isLastMessagesLoading, data: lastMessages } = useQuery(GetLastMessages, {variables: {chatId}})
	const {data: chat, loading: isChatLoading} = useQuery(GetChatByChatId, {
		variables: {
			chatId
		}
	})

	
	const [messages, setMessages] = useState<MessageResponse[]>(lastMessages?.getLastMessagesByChatId?.length ? lastMessages?.getLastMessagesByChatId  : [])
	const {  disconnect, sendMessage, lastMessage, catchMessages } = useChat()
	const send = (msg: Omit<Message, 'createdAt'>) => 
		sendMessage(msg)
	
	const authUserId = currentUser?.getCurrentUser?.id ?? null

	


	useEffect(() => {
		if(lastMessages?.getLastMessagesByChatId?.length)setMessages(lastMessages.getLastMessagesByChatId)
	}, [lastMessages?.getLastMessagesByChatId])

	const scrollDown = () => {
		const current = ref.current
		if (current) {
			current.scrollTo({
				top: current.scrollHeight,
				behavior: "smooth",
			})
		}
	}
	useEffect(() => {
		
	if (lastMessage&&(lastMessage as unknown as any)?.chat?.id=== chatId) {
		const _lastMessage = lastMessage as unknown as MessageResponse
		setMessages(state => [...state, _lastMessage])

		scrollDown()
	}
	}, [lastMessage])

	const [isScrollingUp, updateScrollingUp] = useState(false)
	   const handleScroll = (event: WheelEvent) => {			
      updateScrollingUp(event.deltaY < 0 ? true : false);
    };
	 

	const isLoading = isChatLoading || isLastMessagesLoading || isCurrentUserLoading
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener('wheel', handleScroll);
		}

		return () => {
			if (ref.current) {
				ref.current.removeEventListener('wheel', handleScroll);
			}
		}
	}, [ref.current])
	
	const _messages =  useMemo(() => messages.filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id)), [messages.length])
	return ( 
<>
		<div className="flex flex-col gap-5 h-full w-full relative">
			<ChatHeader isLoading={isLoading} authUserId={authUserId} users={chat?.getChatByChatId?.users ?? []} />
			<ChatMessages ref={ref} authUserId={authUserId} messages={_messages ?? []} isLoading={isLoading} />
			<ChatControl ref={ref} chatId={chatId as string} userId={authUserId} sendMessage={send} isLoading={isLoading} />
		
		
			<div className={`transition-all duration-[1500] ${isScrollingUp ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 -z-10 pointer-events-none'}`}>
				<Button onClick={() => {
					scrollDown()
					updateScrollingUp(false)
				}
					} type="button" size={'icon'} className={`rounded-[50%] absolute bottom-[80px] animate-pulse right-[0px] `}>
					<ArrowDown height={ICON_SIZE.DEFAULT} width={ICON_SIZE.DEFAULT} />
				</Button>	
			</div>	
		</div></>
	)
}

export default ChatDetail
