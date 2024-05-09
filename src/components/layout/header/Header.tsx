import { FC } from "react"
import SearchForm from "../../common/SearchForm"
import styles from "./header.module.scss"
import GetAllUsers from "@/schemas/user/GetAllUsers.graphql"
const Header: FC = ({}) => {
	return (
		<div className={styles.header}>
			<div className={styles.body}>
				<div className="w-[33%]" />
				<div className={styles.search}>
					<SearchForm model={GetAllUsers} termName="searchTerm" />
				</div>
				<div className="w-[33%]" />
			</div>
		</div>
	)
}

export default Header
