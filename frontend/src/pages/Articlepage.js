import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Sidebar from './../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { fetchPost } from '../actions/postActions'

const Articlepage = () => {
const {id} = useParams()
const dispatch = useDispatch()

const fetchSinglePost = useSelector(state => state.fetchSinglePost)
const { error, loading, post } = fetchSinglePost
console.log(post);

useEffect(() => {
  dispatch(fetchPost(id))
}, [dispatch, id])
  return (
    <div className="row g5">
      <div className="col-md-8">
      {loading && <Spinner/>}
      {error && <Message>{error}</Message>} 
      {/* {post.body} */}
      </div>
      <div className="col-md-4">
        <Sidebar />
      </div>
    </div>
  )
}

export default Articlepage
