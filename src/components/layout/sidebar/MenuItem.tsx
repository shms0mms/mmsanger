import { FC, ReactNode } from "react"
import styles from "./sidebar.module.scss"
import Link from "next/link"
export interface IMenuItem {
	icon: ReactNode
	title: string
	href: string
}

const MenuItem: FC<IMenuItem> = ({ icon, title, href }) => {
	return (
		<li>
			<Link className={styles.item} href={href}>
				{icon} {title}
			</Link>
		</li>
	)
}

export default MenuItem
