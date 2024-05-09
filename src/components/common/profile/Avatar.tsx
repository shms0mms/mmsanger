import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FC } from "react"
import Status from "./Status"
import { DEFAULT_USER_IMAGE_URL } from "@/constants/main"
import styles from "./profile.module.scss"
import { Skeleton } from "@/components/ui/skeleton"
import { IProfile } from "./Profile"
export interface IProfileAvatar
	extends Pick<IProfile, "isLoading" | "imageURL" | "status"> {}
const ProfileAvatar: FC<IProfileAvatar> = ({ isLoading, imageURL, status }) => {
	return (
		<>
			<div className="relative w-32 h-32">
				<Avatar className={styles.avatar}>
					<AvatarImage src={imageURL || DEFAULT_USER_IMAGE_URL} />

					<AvatarFallback>
						{(isLoading || !isLoading) && (
							<>
								<Skeleton className="skeleton w-full h-full rounded-[50%]" />
								<Skeleton className="w-[80%] h-[80%] rounded-[50%] opacity-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
							</>
						)}
					</AvatarFallback>
				</Avatar>
				<Status status={status} />
			</div>
		</>
	)
}

export default ProfileAvatar
