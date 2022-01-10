import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import BlogItem from '../components/BlogItem'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { searchPosts } from '../actions/postActions'

const SearchPage = () => {
  const dispatch = useDispatch()
  const {keyword} = useParams()
  // const q = params.keyword ? params.keyword : ''

  const searchAllPosts = useSelector(state => state.searchAllPosts)
  const { loading, posts, error } = searchAllPosts

  useEffect(() => {
    dispatch(searchPosts(keyword))
  }, [dispatch , keyword])


  return (
    <>
        
        <div className="row g5">
        <div className="col-md-8">
          <h1>Search Result for: {keyword}</h1>
          <hr />
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error}</Message>} 
          {posts?.map(post => <BlogItem key={post._id} post={post}/>) }
        </div>
        <div className="col-md-4">
          <Sidebar />
        </div>
      </div>
        
        
      </>
  )
}

export default SearchPage
