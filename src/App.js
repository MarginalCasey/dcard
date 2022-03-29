import { useState, useEffect, useMemo, useRef } from 'react'
import usePrevious from './hooks/usePrevious'
import useSearchRepositories from './hooks/useSearchRepositories'
import useLoadMore from './hooks/useLoadMore'
import Link from './Link'
import './App.css'

const NAV_HEIGHT = 48

function App() {
  const viewPortHeight = useRef(window.innerHeight)

  useEffect(() => {
    let timer

    function countViewPortHeight() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        viewPortHeight.current = window.innerHeight
      }, 500)
    }

    window.addEventListener('resize', countViewPortHeight)

    return () => window.removeEventListener('resize', countViewPortHeight)
  }, [])

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

  const [visibleRange, setVisibleRange] = useState([0, 0])

  const prevResult = usePrevious(result)

  useEffect(() => {
    setVisibleRange(prev => [
      prev[0],
      prev[1] + result.length - prevResult.length,
    ])
  }, [result])

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
      <main>
        <div className="loading">
          {result.length === 0 && isFetching && '載入中...'}
        </div>
        {result.slice(visibleRange[0], visibleRange[1] + 1).map(item => (
          <Link
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
