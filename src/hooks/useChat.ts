'use client'
import { Message } from "@/types/chat"
import { getAccessToken } from "@/utils/auth.utils"
import {  Context, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useParams } from "next/navigation"
import { MessageContext, TMessageContext } from "@/providers/MessageProvider"
const useChat = () => {
	const [lastMessage, setLastMessage] = useState('')
	const socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? 'ws://localhost:8000'}/chat`, {
		auth: {
			accessToken: getAccessToken()
		},
		withCredentials: true,
	})
	const {chatId} = useParams()
	const sendMessage = (msg: Omit<Message, 'createdAt'>) => {
		if (msg.message) socket.emit('message', msg)
	}
	const {setLastMessage: setLastMessageToContext} = useContext(MessageContext as Context<TMessageContext>)
	const catchMessages = () => {
		socket.on('message', (data) => {		
			setLastMessageToContext(data)				
			setLastMessage(data)
		})

	}
	
	const disconnect = () => {
		socket.disconnect()
	}
	socket.on('connect', () => {
		catchMessages()
	}) 

	useEffect(() => {
		return () => {
			if (socket.active) disconnect()
		}
	}, [chatId])
	
	return {sendMessage, disconnect, catchMessages, lastMessage}
}

export default useChat
