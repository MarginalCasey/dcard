import { useRef, useEffect } from 'react'

function useLoadMore(isSuccess, isIncomplete, setPage) {
  const anchorRef = useRef()

  useEffect(() => {
    function loadMore([anchor]) {
      if (anchor.isIntersecting && isIncomplete) {
        setPage(page => page + 1)
      }
    }

    if (isSuccess) {
      const observer = new IntersectionObserver(loadMore)
      observer.observe(anchorRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [isSuccess, isIncomplete, setPage])

  return anchorRef
}

export default useLoadMore
