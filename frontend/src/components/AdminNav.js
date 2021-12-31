import React from 'react'
import { Link } from 'react-router-dom'
const AdminNav = () => {
  return (
    <div id='sidebarMenu' className='bg-light' style={{ minHeight: '70vh'}}>
      <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/tiny-admin">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/posts">All Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/create-post">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/categories">All Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/create-category">New Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/users">Link</Link>
            </li>
          </ul>
    </div>
  )
}

export default AdminNav
