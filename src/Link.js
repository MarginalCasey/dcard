import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function Link({ id, url, cachedHeight, children, ...props }) {
  const ref = useRef()

  useEffect(() => {
    if (cachedHeight[id] === undefined) {
      cachedHeight[id] = ref.current.clientHeight
    }
  }, [])

  return (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  cachedHeight: PropTypes.object,
  children: PropTypes.node,
}

export default Link
