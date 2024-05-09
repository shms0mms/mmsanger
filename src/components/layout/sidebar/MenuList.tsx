import { FC } from "react"
import MenuItem from "./MenuItem"
import { ROUTES } from "@/constants/routes.constants"
import { Home, UserCheckIcon, Users } from "lucide-react"
import styles from "./sidebar.module.scss"
import Loader from "@/components/ui/Loader"
import { User } from "@/types/auth"
import { ICON_SIZE } from "@/constants/icon-size.constants"
export interface IMenuList {
	user: User | null
	isLoading: boolean
}

const MenuList: FC<IMenuList> = ({ user, isLoading }) => {

	const isAuth = !!user?.id

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<ul className={styles.list}>
					<MenuItem
						icon={<Home fontSize={ICON_SIZE.DEFAULT} />}
						title="Главная"
						href={ROUTES.home}
					/>
					{isAuth && (
						<MenuItem
							icon={<Users fontSize={ICON_SIZE.DEFAULT} />}
							title="Поиск собеседников"
							href={ROUTES.finder}
						/>
					)}
					{!isAuth && (
						<MenuItem
							icon={<UserCheckIcon fontSize={ICON_SIZE.DEFAULT} />}
							title="Вход в аккаунт"
							href={ROUTES.login}
						/>
					)}
				</ul>
			)}
		</>
	)
}

export default MenuList
