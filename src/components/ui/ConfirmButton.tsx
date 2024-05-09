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
import { cn } from "@/lib/utils"
import { FC, ReactNode, useEffect, useState } from "react"
export interface IConfirmButton {
	isLoading?: boolean
	actions?: () => void
	children?: ReactNode
	description?: string
	title?: string
	className?: string
}
const ConfirmButton: FC<IConfirmButton> = ({
	isLoading: isLoadingProps,
	actions,
	children,
	description,
	title,
	className,
}) => {
	const [isContinue, updateContinue] = useState(false)
	useEffect(() => {
		if (isContinue) {
			actions && actions()
		}
		isContinue && updateContinue(false)
	}, [isContinue])
	const isLoading = isLoadingProps
	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger
					disabled={!!isLoading}
					className={cn(
						`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-1 ${className}`
					)}
				>
					{isLoading ? <Loader /> : children}
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{description}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => updateContinue(false)}>
							Отменить
						</AlertDialogCancel>
						<AlertDialogAction onClick={() => updateContinue(true)}>
							Продолжить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default ConfirmButton
