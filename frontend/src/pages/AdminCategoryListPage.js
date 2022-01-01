import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminNav from '../components/AdminNav'
import { getCategories } from '../actions/categoryActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const AdminCategoryListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchCategories = useSelector(state => state.fetchCategories)
  const { loading, error, categories } = fetchCategories

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }else{
      dispatch(getCategories())
    }
  }, [dispatch, userInfo, navigate])
  

  return (
    <>
      <div className="row g5">
        <div className="col-md-3" >
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>All Categories</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error}</Message>}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created On</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => {
                return (
                  <tr key={category._id}>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/tiny-admin/category/${category._id}/edit`}>{category.name}</Link></td>
                    <td><Link to={`/tiny-admin/category/${category.id}/edit`}>{category.description}</Link></td>
                    <td>{moment(category.createdAt).fromNow()}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/tiny-admin/category/${category._id}/edit`} type="button" className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil-square"></i>
                          <span className="visually-hidden">Button</span>
                        </Link>
                        <button type="button" className="btn btn-outline-danger btn-sm">
                          <i className="bi bi-trash"></i>
                          <span className="visually-hidden">Button</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminCategoryListPage
