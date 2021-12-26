import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const TopHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  let { userInfo } = userLogin

  console.log(userInfo);

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="blog-header py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1">
          <Link className="link-secondary" to="/subscribe">Subscribe</Link>
        </div>
        <div className="col-4 text-center">
          <Link className="blog-header-logo text-dark" to="/">Tiny</Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <Link className="link-secondary" to="/search" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
          </Link>
          {userInfo ? (
            <div className="btn-group">
              <button type="button" className="btn btn-outline-secondary">{userInfo.data.user.name}</button>
              <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
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
  //   <header className="p-3 mb-3 border-bottom">
  //   <div className="container">
  //     <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
  //       <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
  //         <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
  //           {/* <use xlink:href="#bootstrap"></use> */}
  //         </svg>
  //       </a>

  //       <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
  //         <li><a href="#" className="nav-link px-2 link-secondary">Overview</a></li>
  //         <li><a href="#" className="nav-link px-2 link-dark">Inventory</a></li>
  //         <li><a href="#" className="nav-link px-2 link-dark">Customers</a></li>
  //         <li><a href="#" className="nav-link px-2 link-dark">Products</a></li>
  //       </ul>

  //       <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
  //         <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
  //       </form>

  //       <div className="dropdown text-end">
  //         <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
  //           <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
  //         </a>
  //         <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
  //           <li><a className="dropdown-item" href="#">New project...</a></li>
  //           <li><a className="dropdown-item" href="#">Settings</a></li>
  //           <li><a className="dropdown-item" href="#">Profile</a></li>
  //           <li><hr className="dropdown-divider"/></li>
  //           <li><a className="dropdown-item" href="#">Sign out</a></li>
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // </header>
  )
}

export default TopHeader
