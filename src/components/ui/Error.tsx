import { UIComponent } from "@/types/components"
import { FC, PropsWithChildren } from "react"

const Error: FC<PropsWithChildren<UIComponent>> = ({ children, className }) => {
	return <div className={`text-red-500 text-xs ${className}`}>{children}</div>
}

export default Error
