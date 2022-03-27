import { useRef, useEffect } from 'react'

function useDebounceEffect(callback, dependencies, delay) {
  const isInitialRender = useRef(true)
  useEffect(
    isInitialRender.current
      ? () => {
          isInitialRender.current = false
        }
      : () => {
          const handler = setTimeout(callback, delay)
          return () => clearTimeout(handler)
        },
    dependencies
  )
}

export default useDebounceEffect
