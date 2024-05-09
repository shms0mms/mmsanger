import { Skeleton } from "@/components/ui/skeleton"
import { FC } from "react"

const ChatSkeleton: FC = ({}) => {
	return (
		<>
			<div className="flex items-center space-x-4">
				<Skeleton className="skeleton h-8 w-8 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="skeleton h-4 w-[250px]" />
					<Skeleton className="skeleton h-4 w-[200px]" />
				</div>
			</div>
		</>
	)
}

export default ChatSkeleton
