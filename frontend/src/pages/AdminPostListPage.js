import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminNav from '../components/AdminNav'
import { fetchPosts } from '../actions/postActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const AdminPostListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchAllPosts = useSelector(state => state.fetchAllPosts)
  const { loading, error, posts } = fetchAllPosts

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }else{
      dispatch(fetchPosts())
    }
  }, [dispatch, userInfo, navigate])
  

  return (
    <>
      <div className="row g5">
        <div className="col-md-3" >
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>All Posts</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error}</Message>}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Posted On</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post, index) => {
                return (
                  <tr key={post._id}>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/tiny-admin/post/${post._id}/edit`}>{post.title}</Link></td>
                    <td><Link to={`/tiny-admin/category/${post.category.id}/edit`}>{post.category.name}</Link></td>
                    <td>{moment(post.createdAt).fromNow()}</td>
                  </tr>
                )
              })}
              {/* <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminPostListPage
