import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { getCategories } from '../actions/categoryActions'
import Spinner from './Spinner'
import Message from './Message'



const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  let { userInfo } = userLogin

  const fetchCategories = useSelector(state => state.fetchCategories)
  let { loading, categories, error } = fetchCategories

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className="container">
      <header className="blog-header py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <Link className="link-secondary" to="/subscribe">Subscribe</Link>
            </div>
            <div className="col-4 text-center">
              <Link className="blog-header-logo text-dark" to="/">Tiny</Link>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              {userInfo ? (
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary">{userInfo?.data?.user?.name}</button>
                  <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu">
                    {userInfo?.data?.user.role === 'admin' && (
                      <li><Link className="dropdown-item" to="/tiny-admin">Admin Dashboard</Link></li>
                    ) }                    
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/update-my-password">Update Password</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button type='button' className="dropdown-item" onClick={logoutHandler}>Logout</button></li>
                  </ul>
                </div>
                ) : (
                  <>
                  <Link className="btn btn-sm btn-outline-secondary " to="/login">Sign in</Link>
                  {/* <Link className="btn btn-sm btn-outline-secondary" to="/register">Sign up</Link> */}
                  <Link type="button" className="btn btn-sm btn-warning mx-3" to='/register'>Sign up</Link>
                  </>
                )
                }
              
            </div>
          </div>
        </header>
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            {loading && <Spinner /> }
            {error && <Message variant='danger'>{error}</Message>}
            {categories?.map(category => <Link key={category._id} className="p-2 link-secondary" to={`/category/${category._id}`}>{category.name}</Link>)}
          </nav>
        </div>
    </div>
  )
}

export default Header
