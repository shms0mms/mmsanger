"use client"
import Loader from "@/components/ui/Loader"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ICON_SIZE } from "@/constants/icon-size.constants"
import { ROUTES } from "@/constants/routes.constants"
import { removeAccessToken, removeRefreshToken } from "@/utils/auth.utils"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { toast } from "sonner"
import ConfirmButton from "./ConfirmButton"

const LogoutButton: FC<{ isLoading?: boolean }> = ({
	isLoading: isLoadingProps,
}) => {
	const { push } = useRouter()
	const actions = () => {
		removeAccessToken()
		removeRefreshToken()
		toast.info("Вы вышли из аккаунта.")
		push(ROUTES.login)
	}

	const isLoading = isLoadingProps
	return (
		<>
			<ConfirmButton
				actions={actions}
				isLoading={isLoading}
				title="Вы точно хотите выйти из аккаунта?"
				description="Если вы выйдите из аккаунта вам придется заново в него входить"
			>
				<LogOut width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} /> Выйти
			</ConfirmButton>
		</>
	)
}

export default LogoutButton
