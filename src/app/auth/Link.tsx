import { FC } from "react"
import { default as NextLink } from "next/link"
export interface ILink {
	href?: string
	text: string
	title: string
	onClick?: () => void
}

const Link: FC<ILink> = ({ text, title, href, onClick }) => {
	return (
		<div className="">
			{text}{" "}
			{href ? (
				<NextLink className="text-destructive" href={href}>
					{title}
				</NextLink>
			) : (
				onClick && (
					<button onClick={onClick} className="text-destructive">
						{title}
					</button>
				)
			)}
		</div>
	)
}

export default Link
