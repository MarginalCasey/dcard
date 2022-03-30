import React, { forwardRef, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const Link = forwardRef(
  ({ id, url, cachedHeight, children, ...props }, ref) => {
    const innerRef = useRef()
    const linkRef = ref || innerRef

    useEffect(() => {
      if (cachedHeight[id] === undefined) {
        cachedHeight[id] = linkRef.current.clientHeight
      }
    }, [])

    return (
      <a ref={linkRef} href={url} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }
)

Link.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  cachedHeight: PropTypes.object,
  children: PropTypes.node,
}

export default Link
