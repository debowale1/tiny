import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogItem from '../components/BlogItem'
import FeaturedPosts from '../components/FeaturedPosts'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import { fetchPosts, fetchFeaturedPosts } from '../actions/postActions'

const HomePage = () => {
  const dispatch = useDispatch()  

  const fetchAllPosts = useSelector(state => state.fetchAllPosts)
  const { loading, posts, error } = fetchAllPosts

  const featuredPost = useSelector(state => state.featuredPost)
  const { loading:loadingFeatured, post:postFeatured, error:errorFeatured } = featuredPost

  useEffect(() => {
    dispatch(fetchFeaturedPosts())
    dispatch(fetchPosts())
  }, [dispatch])


  return (
    <>
        {loadingFeatured ? <Spinner/> : errorFeatured ? <Message>{errorFeatured}</Message> : (
          postFeatured.map(post => <FeaturedPosts key={post._id} post={postFeatured}/>)
        )}
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
      </>
  )
}

export default HomePage
