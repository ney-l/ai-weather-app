import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

let client: ApolloClient<unknown> | null = null

export const getClient = () => {
  if (!client) {
    client = new ApolloClient({
      uri: process.env.API_URL,
      headers: {
        Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      cache: new InMemoryCache(),
    })
  }

  return client
}
