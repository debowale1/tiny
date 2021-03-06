import React from 'react'
import { Link } from 'react-router-dom'
const AdminNav = () => {
  return (
    <div id='sidebarMenu' className='bg-light' style={{ minHeight: '70vh'}}>
      <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/tiny-admin">Dashboard</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/posts"><i className="bi bi-pin-fill"></i> All Posts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/create-post"><i className="bi bi-file-earmark-richtext-fill"></i> New Post</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/categories"><i className="bi bi-pin-fill"></i> All Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/create-category"><i className="bi bi-file-earmark-richtext-fill"></i> New Category</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/comments"><i className="bi bi-chat-right-text-fill"></i> Manage Comments</Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/users"><i className="bi bi-people-fill"></i> Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tiny-admin/create-user"><i className="bi bi-person-fill"></i> New User</Link>
            </li>
          </ul>
    </div>
  )
}

export default AdminNav
