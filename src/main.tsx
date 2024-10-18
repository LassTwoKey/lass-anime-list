import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    from,
    createHttpLink,
} from '@apollo/client'

import './assets/index.css'
import { router } from './router/router.tsx'
import { registerServiceWorker } from './registerServiceWorker'

const httpLink = createHttpLink({
    uri: 'https://graphql.anilist.co',
    // credentials: 'same-origin', // omit, same-origin
})

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    Page: {
                        merge: true,
                    },
                    Media: {
                        merge: true,
                    },
                },
            },
        },
    }),
    link: from([httpLink]),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
)

registerServiceWorker()
