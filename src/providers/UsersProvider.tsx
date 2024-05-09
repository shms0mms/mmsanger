"use client"
import useSearchParams from "@/hooks/useSearchParams"
import { ReactFunc } from "@/types/app"
import { createContext, useState } from "react"

export type TUsersContext = {
	currentPage: number
	searchTerm: string
	updateCurrentPage: ReactFunc<number>
	updateSearchTerm: ReactFunc<string>
	lastMessage: any 
	setLastMessage: ReactFunc<any>
}
export const UsersContext = createContext<TUsersContext | {}>({})

import { FC, PropsWithChildren } from "react"

const UsersProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const {get} = useSearchParams()
		const [lastMessage, setLastMessage] = useState()
	const [currentPage, updateCurrentPage] = useState<number>(+get('page') || 1)
	const [searchTerm, updateSearchTerm] = useState(get('searchTerm') ?? '')
	const value: TUsersContext = {
		currentPage,
		updateCurrentPage,
		searchTerm,
		updateSearchTerm,
		lastMessage,
		setLastMessage
	}
	
	return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export default UsersProvider
