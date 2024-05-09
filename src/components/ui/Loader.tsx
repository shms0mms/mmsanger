"use client"
import { ICON_SIZE } from "@/constants/icon-size.constants"
import { UIComponent } from "@/types/components"
import { Loader2 } from "lucide-react"
import { FC } from "react"

export interface ILoader {
	size?: number
}

const Loader: FC<ILoader & UIComponent> = ({ size, className }) => {
	const SIZE = size || ICON_SIZE.DEFAULT
	return (
		<div className="w-full h-full justify-center flex items-center gap-2">
			<Loader2
				width={SIZE}
				height={SIZE}
				className={`animate-spin ${className}`}
			/>
			Loading ...
		</div>
	)
}

export default Loader
