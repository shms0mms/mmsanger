import { NextRequest, NextResponse } from "next/server"
import { EnumTokens } from "./types/auth"
import { ROUTES } from "./constants/routes.constants"
export default async function middleware(request: NextRequest) {
	const { cookies, url } = request
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const pathname = url
	const auth = '/auth'
	const isAuthScreen = pathname.includes(auth)

	
	if (isAuthScreen && accessToken) {
		if (!pathname.includes(ROUTES.home))
			return NextResponse.redirect(new URL(ROUTES.home, pathname))
	}
	else if (!isAuthScreen && !accessToken)
		if (refreshToken) {
			if (isAuthScreen)
				if (!pathname.includes(ROUTES.home))
					return NextResponse.redirect(new URL(ROUTES.home, pathname))
		} else {
			if (!pathname.includes(auth))
				return NextResponse.redirect(new URL(ROUTES.login, pathname))
		}
	if (accessToken && refreshToken)
		return NextResponse.next()
}
export const config = { matcher: "/((?!.*\\.).*)" }
