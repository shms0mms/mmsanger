import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@/constants/main"
import Cookies from "js-cookie"
export const getAccessToken = () => {
	const accessToken = Cookies.get(ACCESS_TOKEN_NAME)

	return accessToken || null
}
export const withBearerToken = (token: string) => `Bearer ${token}`
export const saveAccessToken = (accessToken: string) => {
	const expiresIn = new Date()
	expiresIn.setMinutes(expiresIn.getMinutes() + 15)

	Cookies.set(ACCESS_TOKEN_NAME, accessToken, {
		expires: expiresIn,
	})
}

export const removeAccessToken = () => {
	Cookies.remove(ACCESS_TOKEN_NAME)
}

export const getRefreshToken = () => {
	const refreshToken = Cookies.get(REFRESH_TOKEN_NAME)
	return refreshToken || null
}

export const saveRefreshToken = (refreshToken: string) => {
	const expiresIn = new Date()
	expiresIn.setDate(expiresIn.getDate() + 7)
	Cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
		expires: expiresIn,
	})
}

export const removeRefreshToken = () => {
	Cookies.remove(REFRESH_TOKEN_NAME)
}
