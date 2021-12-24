import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Sidebar from './../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
// import CommentBox from '../components/CommentBox'
import { fetchPost } from '../actions/postActions'
import { writeCommentOnPost } from '../actions/commentActions'

const Articlepage = () => {
  const [comment, setComment] = useState('')
  const {id} = useParams()
  const dispatch = useDispatch()

  const fetchSinglePost = useSelector(state => state.fetchSinglePost)
  const { error, loading, post } = fetchSinglePost

  const commentCreate = useSelector(state => state.commentCreate)
  const { error:errorComment, success:successComment } = commentCreate


  useEffect(() => {
    dispatch(fetchPost(id))
  }, [dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(writeCommentOnPost({postId: id, userId: '60fd08c7d9310d482c9f51df', comment}))
    setComment('')
  }
  return (
    <div className="row g5">
      <div className="col-md-8">
      {loading && <Spinner/>}
      {error && <Message>{error}</Message>} 
      
      <article className="blog-post">
        <h2 className="blog-post-title">
          {post?.title}
        </h2>
        <p className="blog-post-meta">{new Date(post?.createdAt).toLocaleString('en-US', {month: 'long', day: 'numeric'})} by <Link to="#">{post?.author}</Link></p>
        <p dangerouslySetInnerHTML={{__html: post?.body}}></p>
        <hr />
        {/* show comments */}
        {errorComment && <Message>{errorComment.message}</Message>}
        <p>{`(${post?.comments?.length}) comment on this post`}</p>
        {post?.comments && post?.comments.map(comment => <p key={comment._id}>{comment.comment}</p>  )}
        <div className="comment">
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
        {/* <CommentBox /> */}
      </article>
      </div>
      <div className="col-md-4">
        <Sidebar />
      </div>
    </div>
  )
}

export default Articlepage
