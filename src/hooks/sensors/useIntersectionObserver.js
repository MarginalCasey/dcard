import { useRef, useEffect } from 'react'

function useIntersectionObserver(callback) {
  const anchorRef = useRef()

  useEffect(() => {
    if (anchorRef.current) {
      const observer = new IntersectionObserver(callback)
      observer.observe(anchorRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [callback])

  return anchorRef
}

export default useIntersectionObserver
