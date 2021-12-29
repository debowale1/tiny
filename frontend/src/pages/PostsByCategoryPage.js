import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import BlogItem from '../components/BlogItem'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { getPostsByCategory } from '../actions/postActions'

const PostsByCategoryPage = () => {
  const dispatch = useDispatch()
  const {id} = useParams()

  const fetchPostsByCategory = useSelector(state => state.fetchPostsByCategory)
  const { loading, posts, error } = fetchPostsByCategory


  useEffect(() => {
    dispatch(getPostsByCategory(id))
  }, [dispatch, id])


  return (
    <>
      <div className="row g5">
        <div className="col-md-8">
          {loading && <Spinner />} 
          {error && <Message>{error}</Message>}
          { posts?.length > 0 ?  (posts.map(post => <BlogItem key={post._id} post={post}/>)) : (<h3 className='text-center'>No Posts currently in this category</h3>  ) }
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default PostsByCategoryPage
