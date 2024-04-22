import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useQuery, gql } from '@apollo/client'

const GET_LOCATIONS = gql`
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media(id: $id, search: $search) {
                id
                title {
                    romaji
                }
                type
                format
                status
            }
        }
    }
`

function App() {
    const [count, setCount] = useState(0)
    const { loading, error, data } = useQuery(GET_LOCATIONS, {
        variables: {
            search: 'Fate/Zero',
            page: 1,
            perPage: 3,
        },
    })

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
