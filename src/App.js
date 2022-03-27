import { useState } from 'react'
import useSearchRepositories from './hooks/useSearchRepositories'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)

  function onSearchInputChange(e) {
    setSearchText(e.target.value)
    setPage(1)
  }

  const { isFetching, result } = useSearchRepositories(searchText, page)

  return (
    <div>
      <nav>
        <input
          type="text"
          value={searchText}
          onChange={onSearchInputChange}
          placeholder="Search or jump to.."
        />
      </nav>
      <main>
        {isFetching ? (
          <div className="loading">載入中...</div>
        ) : (
          result.map(item => (
            <a key={item.id} href={item.html_url} target="_blank" rel="noreferrer">
              {item.full_name}
            </a>
          ))
        )}
      </main>
    </div>
  )
}

export default App
