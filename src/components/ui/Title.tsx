import { UIComponent } from "@/types/components"
import { FC, PropsWithChildren } from "react"

const Title: FC<PropsWithChildren<UIComponent>> = ({ children, className }) => {
	return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}

export default Title
