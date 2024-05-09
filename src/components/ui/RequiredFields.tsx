import { FC } from "react"
import Star from "./Star"

const RequiredFields: FC = ({}) => {
	return (
		<div className="flex text-sm opacity-70 items-center gap-1">
			Поля отмеченные звездочкой <Star /> обязательные
		</div>
	)
}

export default RequiredFields
