export interface UserDB {
	id: number
}
export interface UserCreate {
	email: string
	password: string
	username: string
	firstName: string
	secondName: string
	imageURL: string
}
export interface UserLogin {
	email: string
	username: string
	password: string
}
export enum EnumStatus {
	offline = "offline",
	online = "online",
}
export interface User extends UserDB, UserCreate {
	status: EnumStatus
	description?: string
}

export interface UserGet extends Omit<User, "password"> {}

export enum EnumTokens {
	"ACCESS_TOKEN" = "accessToken",
	"REFRESH_TOKEN" = "refreshToken",
}
