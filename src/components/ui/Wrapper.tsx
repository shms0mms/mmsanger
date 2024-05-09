import { cn } from "@/lib/utils"
import { UIComponent } from "@/types/components"
import { FC, PropsWithChildren } from "react"

const Wrapper: FC<PropsWithChildren<UIComponent>> = ({
	children,
	className,
}) => {
	return (
		<div className={cn(`w-full h-full p-2 relative ${className}`)}>
			{children}
		</div>
	)
}

export default Wrapper
