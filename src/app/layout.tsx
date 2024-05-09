import type { Metadata } from "next"

import "../styles/globals.scss"
import { play } from "@/styles/fonts"
import ThemeProvider from "@/providers/ThemeProvider"
import ApolloProvider from "@/providers/ApolloProvider"
import UsersProvider from "@/providers/UsersProvider"
import { Toaster } from "sonner"
import Auth from "@/components/layout/Auth"
import ChatsProvider from "@/providers/ChatsProvider"
import MessageProvider from "@/providers/MessageProvider"

export const metadata: Metadata = {
	title: "Mmsanger",
	description: "Mssanger - service for correspondence with other companion",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	
	return (
		<html lang="en" >
			<body className={play.className}>
				<ApolloProvider>
					<ChatsProvider>
						<UsersProvider>
							<MessageProvider>
								<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
									{children}
								</ThemeProvider>
								<Auth />								
							</MessageProvider>
						</UsersProvider>
					</ChatsProvider>
				</ApolloProvider>
				<Toaster theme="dark" position="bottom-right" duration={1500} />
					
			</body>
		</html>
	)
}
