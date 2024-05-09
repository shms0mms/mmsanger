import { FC } from "react"
interface IMenuButton {
	isOpen: boolean
}
const MenuButton: FC<IMenuButton> = ({ isOpen }) => {
	const line = `bg-primary relative transition-all overflow-hidden duration-300 ease-in-out inline-block w-full min-h-[2px] max-h-[2px]`
	const topLine = `${line} ${isOpen ? "-rotate-45" : "rotate-0"}`
	const bottomLine = `${line} ${isOpen ? "rotate-45 -top-[2px]" : "rotate-0"}`
	const middleLine = `${line} ${isOpen ? "hidden" : "block"}`
	const button = `flex flex-col h-[14px] w-[20px] ${
		isOpen ? "justify-center items-start" : "justify-between"
	}`
	return (
		<div className={button}>
			<span className={topLine} />
			<span className={middleLine} />
			<span className={bottomLine} />
		</div>
	)
}

export default MenuButton
