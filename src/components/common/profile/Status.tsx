import { EnumStatus } from "@/types/auth"
import { FC } from "react"
import { UIComponent } from "@/types/components"
import { cn } from "@/lib/utils"
export interface IStatus extends UIComponent {
	status: EnumStatus
}

const Status: FC<IStatus> = ({ status, className }) => {
	return (
		<div
			className={cn(
				`absolute top-3 right-3 transition-all duration-300 ease-in-out ${
					status === "online"
						? "w-3 h-3 scale-1 rounded-[50%] bg-[#4BB34B]"
						: "w-0 h-0 scale-0 bg-transparent"
				} ${className}`
			)}
		/>
	)
}

export default Status
