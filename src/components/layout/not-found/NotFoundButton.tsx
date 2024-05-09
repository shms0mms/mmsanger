"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { FC } from "react"

const NotFoundButton: FC = ({}) => {
	const { back } = useRouter()
	return (
		<>
			<Button size={"sm"} className="px-7" type="button" onClick={() => back()}>
				Вернуться обратно
			</Button>
		</>
	)
}

export default NotFoundButton
