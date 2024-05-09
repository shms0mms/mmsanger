/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { User } from "@/types/auth"
import { Context, FC, useContext, useEffect, useState } from "react"
import styles from "./profile.module.scss"
import ProfileAvatar from "./Avatar"
import Title from "@/components/ui/Title"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import DescriptionForm from "./DescriptionForm"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/routes.constants"
import { ArrowLeft } from "lucide-react"
import useSearchParams from "@/hooks/useSearchParams"
import { ChatsContext, TChatsContext } from "@/providers/ChatsProvider"
import useChats from "@/hooks/useChats"
export interface IProfile extends Omit<User, "password"> {
	isLoading?: boolean
	isMe?: boolean
	__typename: string
	authUser?: Omit<User, "password"> & { __typename: string }
}

const Profile: FC<IProfile> = user => {
	const {
		email,
		firstName,
		id,
		imageURL,
		secondName,
		username,
		isLoading,
		status,
		description,
		isMe,
		authUser,
	} = user

	const copyAuthUser = structuredClone(authUser)

	//@ts-ignore
	if (copyAuthUser) delete copyAuthUser.__typename
	const { __typename, isLoading: _, authUser: __, ..._user } = user

	const users = copyAuthUser ? [_user, copyAuthUser] : [_user]
	const [isEdit, updateEdit] = useState(false)
	const { push, back } = useRouter()
	const {get} = useSearchParams()
	const chatSearchTerm = get('chatSearchTerm') ?? ""
	const {lastMessage: lastChat, setLastMessage: setLastChat} = useContext(ChatsContext as Context<TChatsContext>)
	const {  createChat } = useChats()
	const chatId = lastChat?.id
		
	useEffect(() => {
		if (chatId !== undefined){
			setLastChat({})
			push(`${ROUTES.chat(chatId)}?chatSearchTerm=${chatSearchTerm}`)
			
		}
	}, [chatId])

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.cols}>
					<div className={styles.col}>
						<Button onClick={() => back()} size={"icon"}>
							<ArrowLeft />
						</Button>
						<ProfileAvatar
							imageURL={imageURL}
							status={status}
							isLoading={isLoading}
						/>
						<Title>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<Skeleton className="skeleton w-full min-h-4" />
									<Skeleton className="skeleton w-[40%] min-h-4" />
								</div>
							) : (
								<span className="flex items-center gap-2">
									<span>{firstName}</span>
									<span>{secondName}</span>
								</span>
							)}
						</Title>
					</div>
					<div className={styles.description}>
						{isLoading ? (
							<Skeleton className="skeleton min-w-16 min-h-4" />
						) : isEdit ? (
							<DescriptionForm updateEdit={updateEdit} />
						) : description ? (
							description
						) : (
							isMe && (
								<button onClick={() => updateEdit(!isEdit)}>
									<Title className="text-xs opacity-80 animate-pulse">
										Нажмите чтобы добавить описание
									</Title>
								</button>
							)
						)}
					</div>
				</div>
				<div className="flex flex-col justify-between items-end">
					{isMe ? (
						<div>
							<Button onClick={() => push(ROUTES.settings)}>
								Редактировать профиль
							</Button>
						</div>
					) : (
						<Button
							onClick={() => {
								
								createChat && createChat(users)
							}}
						>
							Написать пользователю
						</Button>
					)}
					<Title>{username}</Title>
				</div>
			</div>
		</div>
	)
}

export default Profile
