"use client"
import { ReactFunc } from "@/types/app"
import { User } from "@/types/auth"
import { createContext, useState } from "react"
export type TCreateChat =
	| ((users: Omit<User, "password">[]) => void)
	| undefined

export type TLastMessage = { id?: string }
export type TChatsContext = {
	createChat: TCreateChat
	setCreateChat: ReactFunc<TCreateChat>
	lastMessage: TLastMessage
	setLastMessage: ReactFunc<TLastMessage>
}
export const ChatsContext = createContext<TChatsContext | {}>({})

import { FC, PropsWithChildren } from "react"

const ChatsProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [createChat, setCreateChat] = useState<TCreateChat>(undefined)

	const [lastMessage, setLastMessage] = useState({})
	const value: TChatsContext = {
		createChat,
		setCreateChat,
		lastMessage,
		setLastMessage,
	}

	return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
}

export default ChatsProvider
