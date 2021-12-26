import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="blog-footer">
      <p>Blog template built for <Link to="https://getbootstrap.com/">Bootstrap</Link> by <Link to="https://twitter.com/mdo">@mdo</Link>.</p>
      <p>
        <Link to="/">Back to top</Link>
      </p>
    </footer>
  )
}

export default Footer
