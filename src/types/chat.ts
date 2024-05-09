import { User } from "./auth"

export interface Message {
	message: string
	userId: number
	chatId: string
	createdAt: string
}

export interface MessageResponse extends Message {
	id: number
	user: User
}
export interface Chat {
	createdAt: string
	id: string
	users: User[]
	messages: MessageResponse[]
}

export interface Group extends Chat {
	chatName: string
}
