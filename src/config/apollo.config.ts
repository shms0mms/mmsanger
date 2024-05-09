import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloLink, InMemoryCache,  } from "@apollo/client"
const link = createUploadLink({
	uri: process.env.API_URL ?? 'http://localhost:8000/graphql',
	credentials: 'include',
})
export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link as unknown as ApolloLink | undefined
})
