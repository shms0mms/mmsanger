"use client"

import { client } from "@/config/apollo.config"
import { METHODS } from "@/constants/methods.constants"
import { Context, FC, useContext, useEffect } from "react"
import { Form, OnSubmitHandler, useForm } from "react-mms-form"
import { Input } from "@/components/ui/input/input"
import { Search } from "lucide-react"
import { ICON_SIZE } from "@/constants/icon-size.constants"
import { TUsersContext, UsersContext } from "@/providers/UsersProvider"
import useSearchParams from "@/hooks/useSearchParams"
import { DocumentNode } from "graphql"

export interface ISearchForm {
	termName: string
	model: DocumentNode
}
const SearchForm: FC<ISearchForm> = ({termName, model}) => {
	const { updateSearchTerm } = useContext(UsersContext as Context<
		TUsersContext
	>)
	const {set} = useSearchParams()
	const { handleSubmit, register, fields } = useForm({
		withLocalStorage: [termName]
	})
	const onSubmit: OnSubmitHandler = async (data: Record<string, string>) => {
		updateSearchTerm(data[termName] ?? "")
		await client.refetchQueries({
			include: [model],
		})
		set(termName, fields[termName].value ?? "")

		if (fields[termName].value === "") updateSearchTerm("")
	}
	const func =async () => {
			await client.refetchQueries({
			include: [model],
		})
		set(termName, fields[termName].value ?? "")
	}
	
	useEffect(() => {
	func()
	}, [fields[termName] && fields[termName].value === ""])



	return (
		<Form
			method={METHODS.POST}
			handleSubmit={handleSubmit}
			onSubmitHandler={onSubmit}
			className="w-full"
		>
			<div className="relative w-full">
				<Input placeholder="Поиск..." autoComplete="off" register={register} name={termName} />
				<button className="bg-background absolute top-1/2 -translate-y-1/2 right-3">
					<Search width={ICON_SIZE.DEFAULT} height={ICON_SIZE.DEFAULT} />
				</button>
			</div>
		</Form>
	)
}

export default SearchForm
