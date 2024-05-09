/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { EnumStatus } from "@/types/auth"
import { getAccessToken, getRefreshToken } from "@/utils/auth.utils"
import io, { Socket } from "socket.io-client"
import { useContext, useState, Context, useEffect } from "react"
import { TUsersContext, UsersContext } from "@/providers/UsersProvider"

const useStatus = (userId: number) => {
	const { setLastMessage } = useContext<TUsersContext>(UsersContext as Context<
		TUsersContext
	>)
	const accessToken = getAccessToken()
	const refreshToken = getRefreshToken()
	const [lastMessage, updateLastMessage] = useState("")
	const [socket, setSocket] = useState<Socket|undefined>(undefined)
	useEffect(() => {
		const socket = io(`${process.env.WEBSOCKET_URL ?? "ws://localhost:8000"}/status`, {
			withCredentials: true,
			auth: {
				accessToken,
			},
		})
		setSocket(socket)
	}, [])
		const setOnline = async (userId: number) => {
		socket &&	socket.emit("status", { userId, status: EnumStatus.online })

			socket &&	socket.on("connect", () => {
				socket &&	socket.emit("status", { userId, status: EnumStatus.online })
			})
		}

		const catchMessages =  () => {
			socket &&	socket.on("status", data => {
				updateLastMessage(data)
				setLastMessage(data)
			})
		}

		const setOffline = async () => {
			socket &&	socket.disconnect()
		}

	useEffect(() => {
		if (accessToken && refreshToken) {
			if (!!userId) setOnline(userId)
			else {
				setOffline()
			}

			catchMessages()
		}
		return () => {
			if (accessToken && refreshToken){
				setOffline()
			}
		}
	}, [userId, accessToken, refreshToken])

			
		return { setOnline, setOffline, lastMessage: lastMessage as any, catchMessages }
}

export default useStatus
