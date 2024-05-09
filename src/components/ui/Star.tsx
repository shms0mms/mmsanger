import { UIComponent } from "@/types/components"
import { FC } from "react"

const Star: FC<UIComponent> = ({ className }) => {
	return <div className={`text-[#FF8C00] text-sm ${className}`}>*</div>
}

export default Star
