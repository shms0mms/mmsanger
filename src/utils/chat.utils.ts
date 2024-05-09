import { User } from "@/types/auth"

export const getCompanions = (users: User[], authUserId: number | null) => {
	let _users = users.filter(u => u.id !== authUserId)
	_users.slice(0, 2)

	return _users
}
