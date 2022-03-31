import { useRef, useEffect } from 'react'

function useViewportHeight() {
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

  return viewPortHeight.current
}

export default useViewportHeight
