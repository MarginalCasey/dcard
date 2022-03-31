import { useState, useEffect, useMemo } from 'react'
import useViewportHeight from './sensors/useViewportHeight'

function useWindow({ data }) {
  const viewPortHeight = useViewportHeight()
  const cachedHeight = useMemo(() => ({}), [])

  const [scrollTop, setScrollTop] = useState(0)
  const [paddingTop, setPaddingTop] = useState(0)
  const [paddingBottom, setPaddingBottom] = useState(0)
  const [visibleRange, setVisibleRange] = useState([0, -1])

  useEffect(() => {
    function onScroll(e) {
      setScrollTop(document.documentElement.scrollTop)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (data.length === 0) {
      setVisibleRange([0, -1])
    } else {
      setPaddingBottom(0)
      setVisibleRange(prev => [prev[0], data.length - 1])
    }
  }, [data])

  useEffect(() => {
    if (data.length > 0) {
      const heightArr = data.map(item => cachedHeight[item.id])

      let paddingTop = 0
      let startIndex = null
      let endIndex = data.length - 1

      for (let i = 0; i < heightArr.length - 1; i++) {
        const height = heightArr[i]

        if (startIndex === null && paddingTop + height >= scrollTop) {
          startIndex = i
          setPaddingTop(paddingTop)
        }

        if (paddingTop + height >= scrollTop + viewPortHeight) {
          endIndex = i
          break
        }

        paddingTop += height
      }

      const paddingBottom = heightArr
        .slice(endIndex + 1)
        .reduce((total, height) => total + height, 0)

      setPaddingBottom(paddingBottom)

      setVisibleRange([startIndex, endIndex])
    }
  }, [scrollTop])

  const visibleData = useMemo(
    () => data.slice(visibleRange[0], visibleRange[1] + 1),
    [data, visibleRange]
  )

  return { cachedHeight, paddingTop, paddingBottom, visibleData }
}

export default useWindow
