/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Profile from "@/components/common/profile/Profile"
import { useMutation, useQuery } from "@apollo/client"
import GetUserById from '@/schemas/user/GetUserById.graphql'
import {  useParams } from "next/navigation"
import { Context, useContext, useEffect, useState } from "react"
import { TUsersContext, UsersContext } from "@/providers/UsersProvider"
import { User } from "@/types/auth"
import useAuth from "@/hooks/useAuth"
import AddUserToHistory from '@/schemas/history/AddUserToHistory.graphql'
import GetHistory from '@/schemas/history/GetHistory.graphql'
import { client } from "@/config/apollo.config"
export const revalidate = 120
export default function UserDetail() {
	const {userId} = useParams()	
	const {lastMessage} = useContext(UsersContext as Context<TUsersContext>)
const { data, loading } = useQuery(GetUserById, {
	variables: {
		userId
	}
})
	const userFromRequest = data?.getUserById
	
	const [user, setUser] = useState<User & {__typename: string}>(userFromRequest || {})
	useEffect(() => {
		if (userFromRequest) setUser(userFromRequest)
	}, [userFromRequest, loading !== undefined])
	useEffect(() => {
		if (lastMessage?.userId == userId) {
			setUser(state => ({...state, status: lastMessage.status }))
		}
	}, [lastMessage])
	

	const {getCurrentUser} = useAuth()
	useEffect(() => {
		getCurrentUser.query()
	}, [])
	const authUser = getCurrentUser?.data?.getCurrentUser


	const [mutate] = useMutation(AddUserToHistory, {
		variables: {
			userId: +userId
		},
		async onCompleted() {
			await client.refetchQueries({
				include: [GetHistory]
			})
		}
	})
	useEffect(() => {
	if (userId !== authUser?.id)	mutate()
	}, [userId])
	return <>
		<Profile authUser={authUser} isLoading={loading} {...user}  /> 
	</>
}
