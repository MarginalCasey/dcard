import React from 'react'
import PropTypes from 'prop-types'

function Link({ url, children, ...props }) {
  return (
    <a
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
  url: PropTypes.string,
  children: PropTypes.node,
}

export default Link
