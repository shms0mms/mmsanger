import Title from "@/components/ui/Title"
import { FC } from "react"
import SearchForm from "@/components/common/SearchForm"
import GetAllChats from "@/schemas/chat/GetAllChats.graphql"
const ChatHeader: FC = ({}) => {
	return (
		<div className="flex flex-col gap-2">
			<Title>Твои чаты</Title>
			<SearchForm model={GetAllChats} termName="chatSearchTerm" />
		</div>
	)
}

export default ChatHeader
