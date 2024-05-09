import Title from "@/components/ui/Title"
import { User } from "@/types/auth"
import { FC, useEffect, useRef } from "react"
import UserAvatar from "./UserAvatar"

export interface IUserCard extends Omit<User, "password"> {
	authUserId?: number
	pk: number
}

const UserCard: FC<IUserCard> = ({pk, username, id, authUserId, status, imageURL, firstName,secondName, description }) => {
	const isMe = authUserId?.toString() === id?.toString()
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const current = ref.current
		if (current) {
			current.style.opacity = '0'
			setTimeout(() => {
				current.style.opacity = '1'
			}, 100 * pk - 1);			
		}
	}, [ref.current])
	return <div className="transition-all duration-300" ref={ref}>

	<div className="flex items-center gap-5">
		<UserAvatar status={status} id={id} isMe={isMe} imageURL={imageURL} />

		<div className="flex flex-col">
			<Title className="text-base">
				{firstName} {secondName}
			</Title>
			<div>
				{description}
			</div>
		</div>
		
		{isMe && <span className="opacity-60 text-xs">Это вы. (самый лучший человек)</span>}
		</div>
	</div>
}

export default UserCard
