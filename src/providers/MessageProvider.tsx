"use client"
import { ReactFunc } from "@/types/app"
import { MessageResponse } from "@/types/chat"
import { createContext, useState } from "react"
import { FC, PropsWithChildren } from "react"

export type TMessageContext = {
	lastMessage: MessageResponse | undefined
	setLastMessage: ReactFunc<MessageResponse | undefined>
}
export const MessageContext = createContext<TMessageContext | {}>({})

const MessageProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [lastMessage, setLastMessage] = useState<MessageResponse | undefined>(
		undefined
	)
	const value: TMessageContext = {
		lastMessage,
		setLastMessage,
	}

	return (
		<MessageContext.Provider value={value}>{children}</MessageContext.Provider>
	)
}

export default MessageProvider
