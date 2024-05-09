export const ROUTES = {
	home: "/messanger",
	login: "/auth/login",
	register: "/auth/register",
	finder: "/user/all",
	"user-detail": (userId: number) => `/user/${userId}`,
	me: "/user/me",
	settings: "/user/me/settings",
	chat: (chatId: string) => `/messanger/chat/${chatId}`,
}
