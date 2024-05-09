import Status from "@/components/common/profile/Status"
import Loader from "@/components/ui/Loader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_USER_IMAGE_URL } from "@/constants/main"
import { ROUTES } from "@/constants/routes.constants"
import { cn } from "@/lib/utils"
import { EnumStatus, User } from "@/types/auth"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { FC } from "react"
import { toast } from "sonner"

export interface IUserAvatar extends Pick<User, "imageURL"> {
	isMe?: boolean
	status: EnumStatus
	statusClassName?: string
	id?: number
	className?: string
	onClick?: () => void
}

const UserAvatar: FC<IUserAvatar> = ({
	imageURL,
	isMe,
	id,
	status,
	statusClassName,
	className,
	onClick: onClickProps,
}) => {
	const onClick = () => {
		isMe && toast('Это прекрасный человек по имени "Вы"')
	}
	return (
		<div className={cn(`relative w-10 h-10 ${className}`)}>
			{isMe || id === undefined ? (
				<button
					type="button"
					onClick={() => (onClickProps ? onClickProps() : onClick())}
				>
					<Avatar className={className}>
						<AvatarImage src={imageURL || DEFAULT_USER_IMAGE_URL} />
						<AvatarFallback>
							<Loader2 className="animate-spin" />
						</AvatarFallback>
					</Avatar>
				</button>
			) : (
				<Link href={!isMe ? ROUTES["user-detail"](id as number) : ""}>
					<Avatar className={className}>
						<AvatarImage src={imageURL || DEFAULT_USER_IMAGE_URL} />
						<AvatarFallback>
							<Loader2 className="animate-spin" />
						</AvatarFallback>
					</Avatar>
				</Link>
			)}
			<Status
				className={`-top-0.5 -right-0.5 ${statusClassName}`}
				status={status}
			/>
		</div>
	)
}

export default UserAvatar
