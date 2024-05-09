import { User } from "@/types/auth"
import { FC } from "react"
import styles from "../../layout/sidebar/sidebar.module.scss"
import UserAvatar from "@/app/user/all/UserAvatar"
import Loader from "@/components/ui/Loader"
export interface IChatUsers {
	_users: User[]
	isLoading?: boolean
}

const ChatUsers: FC<IChatUsers> = ({ _users, isLoading }) => {
	return (
		<>
			{_users.length > 1 ? (
				<div className="flex items-center gap-0.5">
					{_users.map(u => (
						<div className={styles.user} key={u.id}>
							{u.firstName} {u.secondName}
						</div>
					))}
				</div>
			) : _users.length == 1 ? (
				<div className={styles.user}>
					<UserAvatar
						statusClassName="w-2 h-2 top-0 right-0"
						id={_users[0].id}
						imageURL={_users[0].imageURL}
						status={_users[0].status}
					/>
					<div className="flex items-center ">
						{_users[0].firstName} {_users[0].secondName}
					</div>
				</div>
			) : isLoading ? (
				<Loader />
			) : (
				"Название группы"
			)}
		</>
	)
}

export default ChatUsers
