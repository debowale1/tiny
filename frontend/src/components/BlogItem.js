import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = (props) => {
  const { title, body, slug } = props.post
  return (
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">World</strong>
          <h3 className="mb-0">{title}</h3>
          <div className="mb-1 text-muted">Nov 12</div>
          <p className="card-text mb-auto">{body}</p>
          <Link to={`/${slug}`} className="stretched-link">Continue reading</Link>
        </div>
        <div className="col-auto d-none d-lg-block">
          <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

        </div>
      </div>
  )
}

export default BlogItem
