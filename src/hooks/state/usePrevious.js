import { useRef, useEffect } from 'react'

const usePrevious = value => {
  const previousValue = useRef(value)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return previousValue.current
}

export default usePrevious
