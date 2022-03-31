import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import useIntersectionObserver from './hooks/sensors/useIntersectionObserver'

function LoadMore({ setPage }) {
  const loadMore = useCallback(([anchor]) => {
    if (anchor.isIntersecting) {
      setPage(page => page + 1)
    }
  }, [])

  const ref = useIntersectionObserver(loadMore) 

  return (
    <div ref={ref} className="load-more" />
  )
}

LoadMore.propTypes = {
  setPage: PropTypes.func,
}

export default LoadMore
