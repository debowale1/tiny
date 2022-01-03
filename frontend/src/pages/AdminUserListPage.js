import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminNav from '../components/AdminNav'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { fetchAllUsers } from '../actions/userActions'

const AdminUserListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const userList = useSelector(state => state.userList)
  const { loading, users, error } = userList
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // const postDelete = useSelector(state => state.postDelete)
  // const { loading:loadingDelete, success } = postDelete


  useEffect(() => {
    // if(success){
    //   dispatch(fetchPosts())
    // }else 
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }else{
      dispatch(fetchAllUsers())
    }
  }, [dispatch, userInfo, navigate])

  console.log(users);

  const deleteHandler = (id) => {
    // if(window.confirm('Do you want to delete this post?')){
    //   dispatch(deletePost(id))
    // }
  }
  

  return (
    <>
      <div className="row g5">
        <div className="col-md-3" >
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>All Users</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error}</Message>}
          {/* {loadingDelete && <Spinner />}
          {success && <Message variant='success'>Post deleted Successfully!</Message>} */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Joined On</th>
                <th scope="col">Active?</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/tiny-admin/user/${user._id}/edit`}>{user.name}</Link></td>
                    <td><Link to={`/tiny-admin/category/${user.email}/edit`}>{user.email}</Link></td>
                    <td>{moment(user.createdAt).fromNow()}</td>
                    <td>{user.active ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/tiny-admin/user/${user._id}/edit`} type="button" className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil-square"></i>
                          <span className="visually-hidden">Button</span>
                        </Link>
                        <button onClick={() => deleteHandler(user._id)} type="button" className="btn btn-outline-danger btn-sm">
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

export default AdminUserListPage
