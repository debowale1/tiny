import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogItem from './../components/BlogItem'
import FeaturedPosts from '../components/FeaturedPosts'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { fetchPosts } from '../actions/postActions'

const Homepage = () => {
  const dispatch = useDispatch()

  const fetchAllPosts = useSelector(state => state.fetchAllPosts)
  const { loading, posts, error } = fetchAllPosts

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])


  return (
    <main className='container'>
        <FeaturedPosts />
        <div className="row g5">
          <div className="col-md-8">
            {loading ? <Spinner /> : error ? <Message>{error}</Message> : (
              posts.map(post => <BlogItem key={post._id} post={post}/>)
              

            )}
          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
      </main>
  )
}

export default Homepage
