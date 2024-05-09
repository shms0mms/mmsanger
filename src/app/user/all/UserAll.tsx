/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Paginator from "@/components/common/Pagination"
import { useQuery } from "@apollo/client"
import GetAllUsers from "@/schemas/user/GetAllUsers.graphql"
import { Context, useContext, useEffect, useState } from "react"
import { TUsersContext, UsersContext } from "@/providers/UsersProvider"
import UserCard from "./UserCard"
import Loader from "@/components/ui/Loader"
import { cn } from "@/lib/utils"
import { User } from "@/types/auth"
import useAuth from "@/hooks/useAuth"
import useSearchParams from "@/hooks/useSearchParams"
export default function UserAll() {
	const { currentPage, searchTerm, updateCurrentPage, lastMessage } = useContext<TUsersContext>(
		UsersContext as Context<TUsersContext>
	)
	const {getCurrentUser} = useAuth()
	useEffect(() => {
		getCurrentUser.query()
	}, [])
	const {set} = useSearchParams()
	const { data, loading } = useQuery(GetAllUsers, {
		variables: { currentPage, searchTerm },
	})
	const userId = getCurrentUser?.data?.id


	const _users = data?.getAll?.users
	
	const [users, updateUsers] = useState(_users || [])
	
	useEffect(() => {
		if (lastMessage && users?.length){
				const userId = lastMessage?.userId 
				const suitableUserId = users.findIndex((u: User) => u.id === userId)
				
				updateUsers((state: User[]) => {
				const copy = structuredClone(state)
				const u = copy[suitableUserId]
				if (!!u?.id) u.status = lastMessage?.status
						
				return copy
			})
		}
		
	}, [lastMessage])

	useEffect(() => {

		if (_users?.length ) updateUsers(_users)
		else if (_users == undefined || !_users?.length) updateUsers([])
	}, [_users?.length, loading])
	const authUserId = getCurrentUser?.data?.getCurrentUser?.id
	const isNotExists = loading || !users?.length
	
	return (
		<div className="p-4 flex w-full h-full flex-col">
			<div className={cn(`flex w-full max-h-[83vh] min-h-[83vh] gap-5 flex-col flex-[1_1_auto] ${isNotExists && "flex items-center justify-center"}`)}>
				{users?.length ? users.map((u: Omit<User, "password">, pk: number) => <UserCard pk={pk} authUserId={authUserId ?? undefined} key={u.id} {...u} />) : loading ? <Loader /> : <div>Собеседники по вашей натуральности не найдены :(</div>}
			</div>

			<Paginator 
				updateCurrent={(i: number) => {
					set('page', (i).toString())
					updateCurrentPage(i)
				}} 
				current={currentPage}
				quantity={data?.getAll?.quantity ?? 1}
				next={() =>{ 
					set('page', (currentPage+1).toString())
					updateCurrentPage(p => p + 1)
				}
				}  
				prev={() => {
					set('page', (currentPage - 1).toString())
					
					updateCurrentPage(p => p - 1)		
				}
				} 
			/>
		</div>
	)
}
