import { ICON_SIZE } from "@/constants/icon-size.constants"
import { Icon } from "@/types/components"
import { FC } from "react"

export interface ICross extends Icon {}

const Cross: FC<ICross> = ({ size: sizeProps, color }) => {
	const size = sizeProps || ICON_SIZE.DEFAULT
	return (
		<>
			<svg
				viewBox="0 0 12 12"
				version="1.1"
				width={size}
				height={size}
				color={color}
				xmlns="http://www.w3.org/2000/svg"
			>
				<line x1="1" y1="11" x2="11" y2="1" stroke={color} stroke-width="1" />
				<line x1="1" y1="1" x2="11" y2="11" stroke={color} stroke-width="1" />
			</svg>
		</>
	)
}

export default Cross
