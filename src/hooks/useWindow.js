import { useState, useEffect, useMemo, useRef } from 'react'
import usePrevious from './usePrevious'

function useWindow({ data, cachedHeight, rootMargin }) {
  const [paddingTop, setPaddingTop] = useState(0)

  const [visibleRange, setVisibleRange] = useState([0, -1])
  const visibleData = useMemo(
    () => data.slice(visibleRange[0], visibleRange[1] + 1),
    [data, visibleRange]
  )

  const prevData = usePrevious(data)

  useEffect(() => {
    if (data.length === 0) {
      setVisibleRange([0, -1])
      setPaddingTop(0)
    } else {
      setVisibleRange(prev => [
        prev[0],
        prev[1] + data.length - prevData.length,
      ])
    }
  }, [data])

  const firstItemRef = useRef()

  useEffect(() => {
    function appendFirstItem([firstItem]) {
      if (firstItem.isIntersecting && firstItem.intersectionRatio === 1) {
        const [prevFirstIndex, prevLastIndex] = visibleRange
        const firstIndex = prevFirstIndex - 1
        const lastIndex = prevLastIndex

        if (firstIndex >= 0) {
          setVisibleRange([firstIndex, lastIndex])

          const paddingTop = data
            .slice(0, firstIndex)
            .map(item => cachedHeight[item.id])
            .reduce((sum, value) => sum + value, 0)

          setPaddingTop(paddingTop)
        }
      }
    }

    function removeFirstItem([firstItem]) {
      if (!firstItem.isIntersecting) {
        const [prevFirstIndex, prevLastIndex] = visibleRange
        const firstIndex = prevFirstIndex + 1
        const lastIndex = prevLastIndex

        setVisibleRange([firstIndex, lastIndex])

        const paddingTop = data
          .slice(0, firstIndex)
          .map(item => cachedHeight[item.id])
          .reduce((sum, value) => sum + value, 0)

        setPaddingTop(paddingTop)
      }
    }

    if (visibleData.length > 0) {
      const removeObserver = new IntersectionObserver(removeFirstItem, {
        rootMargin,
        threshold: 0,
      })
      removeObserver.observe(firstItemRef.current)

      const appendObserver = new IntersectionObserver(appendFirstItem, {
        rootMargin,
        threshold: 1,
      })
      appendObserver.observe(firstItemRef.current)

      return () => {
        removeObserver.disconnect()
        appendObserver.disconnect()
      }
    }
  }, [visibleData])

  return { paddingTop, firstItemRef, visibleData }
}

export default useWindow
