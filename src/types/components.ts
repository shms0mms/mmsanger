import { ReactFunc } from "./app"

export interface UIComponent {
	className?: string
	onClick?: () => void
}

export interface Icon {
	size?: number
	color?: string
}

export interface IBaseLayout {
	withCL?: boolean // ChatList
	withU?: boolean // Users History
	className?: string
}

export interface IPagination {
	current: number // Текущая страница
	quantity?: number // кол-во страниц
	take?: number // по сколько брать элементов
	next?: () => void
	prev?: () => void
	updateCurrent?: (i: number) => void
}
