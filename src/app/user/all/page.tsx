import BaseLayout from "@/components/layout/BaseLayout"
import UserAll from "./UserAll"
import Header from "@/components/layout/header/Header"

export default function UserAllPage() {
	return (
		<BaseLayout className="p-0" withU withCL={false}>
			<Header />
			<UserAll />
		</BaseLayout>
	)
}
