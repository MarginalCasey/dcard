import { useState } from 'react'
import useSearchRepositories from './hooks/useSearchRepositories'
import useLoadMore from './hooks/useLoadMore'
import './App.css'

function App() {
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)

  function onSearchInputChange(e) {
    setSearchText(e.target.value)
    setPage(1)
  }

  const { isFetching, isSuccess, result, isIncomplete } = useSearchRepositories(
    searchText,
    page
  )

  const loadMoreRef = useLoadMore(isSuccess, isIncomplete, setPage)

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
        <div className="loading">
          {result.length === 0 && isFetching && '載入中...'}
        </div>
        {result.map(item => (
          <a
            key={item.id}
            href={item.html_url}
            target="_blank"
            rel="noreferrer"
          >
            {item.full_name}
          </a>
        ))}
        {isSuccess && <div ref={loadMoreRef} className="load-more" />}
      </main>
    </div>
  )
}

export default App
