import { FC, useEffect, useState } from "react"
import ChatSkeleton from "../chat/ChatSkeleton"
import { useMutation, useQuery } from "@apollo/client"
import GetHistory from "@/schemas/history/GetHistory.graphql"
import Title from "@/components/ui/Title"
import styles from "./history.module.scss"
import { User } from "@/types/auth"
import UserCard from "@/app/user/all/UserCard"
import Loader from "@/components/ui/Loader"
import ConfirmButton from "@/components/ui/ConfirmButton"
import CleanHistory from '@/schemas/history/CleanHistory.graphql'
import { client } from "@/config/apollo.config"
const History: FC = ({}) => {
	const { data, loading: isHistoryLoading } = useQuery(GetHistory)
	const [windowHeight, setWindowHeight] = useState(0)

	useEffect(() => {
		setWindowHeight(window.innerHeight)
	}, [])

	const skeletons = Array.from(
		{ length: windowHeight / 48 / 1.6 },
		(_, index) => <ChatSkeleton key={index} />
	)
	const [cleanHistory, {loading: isCleanHistoryLoading}] = useMutation(CleanHistory, {
		async onCompleted() {
			await client.refetchQueries({
				include: [GetHistory]
			})
		},

	})
	const isLoading = isHistoryLoading || isCleanHistoryLoading
	return (
		<>
			<Title className="mb-5">История просмотра</Title>
			<div className={styles.history}>
				<div className={`flex -z-10 flex-col gap-5 transition-all h-full duration-300 ease-in-out absolute top-0 left-0 ${isLoading && !data?.getAllChats?.length ? 'opacity-100' : 'opacity-0'}`}>
					{skeletons}
				</div>
				<div className="flex flex-col gap-5 h-full">
					{!!data?.getHistory?.users?.length ? (
						data?.getHistory?.users?.map((u: User, pk: number) => <UserCard pk={pk}  key={u.id} {...u} />)
					)  : <div className="flex items-center justify-center w-full h-full opacity-45">История чистая..</div>}
				</div>
				<ConfirmButton actions={() => {
					cleanHistory()
				}} description="После очистки истории, вы не сможете посмотреть пользователей которых смотрели" isLoading={isLoading} title="Вы точно хотите очистить историю?" className="opacity-60">
					Очистить историю 
				</ConfirmButton>
			</div>
		</>
	)
}

export default History
