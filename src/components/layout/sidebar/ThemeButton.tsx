import { FC } from "react"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes"
const ThemeButton: FC = ({}) => {
	const { setTheme, theme } = useTheme()
	return (
		<>
			<Select defaultValue={theme} onValueChange={value => setTheme(value)}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Выбрать тему" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Выбор темы: </SelectLabel>
						<SelectItem value="light">Светлая</SelectItem>
						<SelectItem value="dark">Темная</SelectItem>
						<SelectItem value="system">Системная</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</>
	)
}

export default ThemeButton
