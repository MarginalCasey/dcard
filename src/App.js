import { useState, useMemo } from 'react'
import useSearchRepositories from './hooks/useSearchRepositories'
import useLoadMore from './hooks/useLoadMore'
import useWindow from './hooks/useWindow'
import Link from './Link'
import './App.css'

const NAV_HEIGHT = 48

function App() {
  const cachedHeight = useMemo(() => ({}), [])

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

  const { paddingTop, firstItemRef, visibleData } = useWindow({
    data: result,
    cachedHeight,
    rootMargin: `-${NAV_HEIGHT}px 0px 0px 0px`,
  })

  return (
    <div>
      <nav style={{ height: NAV_HEIGHT }}>
        <input
          type="text"
          value={searchText}
          onChange={onSearchInputChange}
          placeholder="Search or jump to.."
        />
      </nav>
      <main style={{ paddingTop }}>
        <div className="loading">
          {result.length === 0 && isFetching && '載入中...'}
        </div>
        {visibleData.map((item, index) => (
          <Link
            ref={(index === 0 && firstItemRef) || null}
            key={item.id}
            id={item.id}
            url={item.html_url}
            cachedHeight={cachedHeight}
            style={{ height: ((item.id % 3) + 1) * 30 }}
          >
            {item.full_name}
          </Link>
        ))}
        {isSuccess && <div ref={loadMoreRef} className="load-more" />}
      </main>
    </div>
  )
}

export default App
