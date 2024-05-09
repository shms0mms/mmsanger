/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { FC, useEffect } from "react"
import useStatus from "@/hooks/useStatus"
import useAuth from "@/hooks/useAuth"
import { getAccessToken, getRefreshToken } from "@/utils/auth.utils"
const Auth: FC = () => {
	const { getNewTokens,getCurrentUser, auth } = useAuth()
	const refreshToken = getRefreshToken()
	const accessToken = getAccessToken()
	const user = getCurrentUser?.data?.getCurrentUser
	const userId = user?.id
	const {  } = useStatus(userId)

	

	useEffect(() => {
		if (!accessToken){
			if (refreshToken) {
				getNewTokens.mutate()
				auth.mutate()
			}
		}
		getCurrentUser.query()
	}, [accessToken, refreshToken])
	


	return <></>
}

export default Auth
