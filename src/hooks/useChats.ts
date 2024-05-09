/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { Context, useContext, useEffect, useState } from "react"
import io, { Socket, } from "socket.io-client"
import { User } from "@/types/auth"
import {
	ChatsContext,
	TChatsContext,
} from "@/providers/ChatsProvider"
import { Chat } from "@/types/chat"
const useChats = () => {
	const [lastMessage, setLastMessage] = useState<Chat>()
	const [socket, setSocket] = useState<Socket | undefined>(undefined)
	useEffect(() => {
		const socket = io(`${process.env.WEBSOCKET_URL ?? "ws://localhost:8000"}/chats`, {
			withCredentials: true,
		})
		setSocket(socket)
		const catchChats = () => {
			socket.on("message", data => {
				setLastChat(data)
				setLastMessage(data)
			})
		}		
		socket.on("connect", () => {
			
			catchChats()
		})
	


	 		
		const disconnect = () => {
			socket.disconnect()
		}

		
			return () => {
				if (socket.active) disconnect()
			}
		}, [])
	
	const { setLastMessage: setLastChat } = useContext(ChatsContext as Context<
		TChatsContext
	>)



	const createChat = (users: Omit<User, "password">[]) => {
			
			socket && socket.emit("message", users)
		}

	return {
		lastMessage,
		createChat
	}
}

export default useChats
