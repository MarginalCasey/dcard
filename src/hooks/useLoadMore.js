import { useRef, useEffect } from 'react'

function useLoadMore(isSuccess, isIncomplete, setPage) {
  const anchorRef = useRef()

  useEffect(() => {
    function callback(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && isIncomplete) {
          setPage(page => page + 1)
        }
      })
    }

    if (isSuccess) {
      const observer = new IntersectionObserver(callback)
      observer.observe(anchorRef.current)
    }
  }, [isSuccess, isIncomplete, setPage])

  return anchorRef
}

export default useLoadMore
