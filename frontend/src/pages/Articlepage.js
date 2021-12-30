import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
// import CommentBox from '../components/CommentBox'
import { fetchPost } from '../actions/postActions'
import { writeCommentOnPost } from '../actions/commentActions'

const ArticlePage = () => {
  const [comment, setComment] = useState('')
  const {id} = useParams()
  const dispatch = useDispatch()

  const fetchSinglePost = useSelector(state => state.fetchSinglePost)
  const { error, loading, post } = fetchSinglePost

  const commentCreate = useSelector(state => state.commentCreate)
  const { loading:loadingComment, error:errorComment, success:successComment } = commentCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    dispatch(fetchPost(id))
  }, [dispatch, id, successComment])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!comment){
      alert('You can\'t leave an empty comment')
    }else{
      dispatch(writeCommentOnPost({postId: id, userId: userInfo.data.user._id, comment}))
      setComment('')
    }
  }
  return (
    <div className="row g5">
      <div className="col-md-8">
      {loading && <Spinner/>}
      {error && <Message variant='danger'>{error}</Message>} 
      
      <article className="blog-post">
        <h2 className="blog-post-title">
          {post?.title}
        </h2>
        <p className="blog-post-meta">{new Date(post?.createdAt).toLocaleString('en-US', {month: 'long', day: 'numeric'})} by <Link to="#">{post?.author}</Link></p>
        <p dangerouslySetInnerHTML={{__html: post?.body}}></p>
        <hr />
        {/* show comments */}
        {errorComment && <Message>{errorComment.message}</Message>}
        <p>{post?.comments?.length > 0 ? `(${post?.comments?.length}) comment(s) on this post.` : `Be the first to comment`}</p>

        {post?.comments ? (<div className='list-group'>
        {post?.comments.map(comment => <div key={comment._id} className={`list-group-item list-group-item-action ${userInfo.data.user._id === comment.userId._id ? 'active': ''}`} aria-current="true">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1"></h5>
            <small>{moment(comment.createdAt).fromNow()}</small>
          </div>
          <p className="mb-1">{comment.comment}</p>
          <small className='text-end fst-italic'>{comment.userId.name}</small>
        </div>  )}
        </div>) : null}
        {userInfo ? (<div className="comment my-5">
        <form method='post' onSubmit={handleSubmit}>
          <div className="form-floating">
              <textarea 
                className="form-control" 
                placeholder="Leave a comment here" 
                id="floatingTextarea2" 
                style={{height: "100px"}}
                value={comment}
                onChange={(e) => setComment(e.target.value)}></textarea>
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
            <button type="submit" className="btn btn-primary my-3">Post Comment</button>
          </form>
        </div>
        ) : (<p>Please <Link to={`/login?redirect=/${post?._id}`}>login</Link> to write a comment</p>)}
        
        {loadingComment && <Spinner />}
      </article>
      </div>
      <div className="col-md-4">
        <Sidebar />
      </div>
    </div>
  )
}

export default ArticlePage
