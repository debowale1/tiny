import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import AdminNav from '../components/AdminNav'
import { listComments  } from '../actions/commentActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const AdminCommentListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const commentList = useSelector(state => state.commentList)
  const { loading, error, comments } = commentList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // const commentDelete = useSelector(state => state.categoryDelete)
  // const { loading:loadingDelete, success } = categoryDelete

  useEffect(() => {
    // if(success){
    //   dispatch(getCategories())
    // } else 
    if(!userInfo || userInfo.data.user.role !== 'admin'){
      navigate('/login')
    }else{
      dispatch(listComments())
    }
  }, [dispatch, userInfo, navigate])

  const deleteHandler = (id) => {
    // if(window.confirm('Do you want to delete this category?')){
    //   dispatch(deleteCategory(id))
    // }
  }
  

  return (
    <>
      <div className="row g5">
        <div className="col-md-3" >
          <AdminNav />
        </div>
        <div className="col-md-9">
          <h1>All Comments</h1>
          {loading && <Spinner />}
          {/* {loadingDelete && <Spinner />} */}
          {error && <Message variant='danger'>{error}</Message>}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Comment</th>
                <th scope="col">User</th>
                <th scope="col">Post</th>
                <th scope="col">Created On</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {comments?.map((comment, index) => {
                return (
                  <tr key={comment._id}>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/tiny-admin/comment/${comment._id}/edit`}>{`${comment.comment.substring(0, 50)}...`}</Link></td>
                    <td><Link to={`/tiny-admin/user/${comment.userId._id}/edit`}>{comment.userId.name}</Link></td>
                    <td><Link to={`/${comment.postId?.title}`}>{comment.postId?.title}</Link></td>
                    <td>{moment(comment.createdAt).fromNow()}</td>
                    <td>
                      <div className="btn-group">
                        <Link to={`/tiny-admin/comment/${comment._id}/edit`} type="button" className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil-square"></i>
                          <span className="visually-hidden">Button</span>
                        </Link>
                        <button onClick={() => deleteHandler(comment._id)} type="button" className="btn btn-outline-danger btn-sm">
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

export default AdminCommentListPage
