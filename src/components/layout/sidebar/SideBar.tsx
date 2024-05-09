"use client"
import { FC, useEffect, useState } from "react"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../ui/sheet"
import MenuButton from "../../ui/MenuButton"
import styles from "./sidebar.module.scss"
import Logo from "@/components/ui/Logo"
import MenuList from "./MenuList"
import ThemeButton from "./ThemeButton"
import LogoutButton from "@/components/ui/LogoutButton"
import useAuth from "@/hooks/useAuth"
import Chat from "./chat/Chat"
import { IBaseLayout } from "@/types/components"
import History from "./history/History"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_USER_IMAGE_URL } from "@/constants/main"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes.constants"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SideBar: FC<IBaseLayout> = ({withCL,  withU}) => {
	const [isOpen, updateIsOpen] = useState(false)
	const { getCurrentUser, isLoading } = useAuth()
	useEffect(() => {
		getCurrentUser.query()
	}, [])

	

	return (
		<>
			<Sheet onOpenChange={() => updateIsOpen(!isOpen)}>
				<div className={styles.sidebar}>
					<SheetTrigger className={styles.header}>
						<MenuButton isOpen={isOpen} /> <Logo />
					</SheetTrigger>
					{(withCL || withCL === undefined) && <Chat authUserId={getCurrentUser?.data?.getCurrentUser?.id ?? null} />}
					{withU && <History />}
				</div>
				<SheetContent className="overflow-auto">
					<SheetHeader className="mb-5">
						<SheetTitle className="flex items-center gap-3">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href={ROUTES.me}>
										<Avatar className="h-7 w-7">
										<AvatarImage src={getCurrentUser.data?.getCurrentUser.imageURL || DEFAULT_USER_IMAGE_URL} /> 
										<AvatarFallback>
											<Loader2 className="animate-spin" />
										</AvatarFallback>
										</Avatar>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									Перейти в профиль
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						{getCurrentUser?.data?.getCurrentUser?.username}
					</SheetTitle>
					</SheetHeader>
					<div className={styles.bar}>
						<MenuList
							isLoading={isLoading}
							user={getCurrentUser.data?.getCurrentUser || null}
						/>
						<ThemeButton />
						<LogoutButton isLoading={isLoading} />
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default SideBar
