"use client"
import { client } from "@/config/apollo.config"
import { ApolloProvider as NextApolloProvider } from "@apollo/client"
import { FC, PropsWithChildren } from "react"

const ApolloProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <NextApolloProvider client={client}>{children}</NextApolloProvider>
}

export default ApolloProvider
