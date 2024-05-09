"use client"
import { useQuery } from "@apollo/client"
import GetCurrentUser from "@/schemas/auth/GetCurrentUser.graphql"
import Profile from "@/components/common/profile/Profile"
export const revalidate = 900
export default function Me() {
	const { data, loading } = useQuery(GetCurrentUser)
	
	return (
		<>
			<Profile {...data?.getCurrentUser} isLoading={loading} isMe />
		</>
	)
}
