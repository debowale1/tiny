import * as postConstants from './../constants/postConstants'
import axios from 'axios'

export const fetchPosts = () => async (dispatch) => {
    try {
      dispatch({ type: postConstants.FETCH_ALL_POSTS_REQUEST })
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.get('/api/v1/posts', config)
    const {data: { posts } } = data
    dispatch({ type: postConstants.FETCH_ALL_POSTS_SUCCESS, payload: posts})
  } catch (error) {
    dispatch({ type: postConstants.FETCH_ALL_POSTS_FAIL, payload: error })
  }
}



export const getPostsByCategory = (id) => async (dispatch) => {
    try {
      dispatch({ type: postConstants.FETCH_POSTS_BY_CATEGORY_REQUEST })
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.get(`/api/v1/posts/category/${id}`, config)
    dispatch({ type: postConstants.FETCH_POSTS_BY_CATEGORY_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: postConstants.FETCH_POSTS_BY_CATEGORY_FAIL, payload: error })
  }
}



export const fetchFeaturedPosts = () => async (dispatch) => {
    try {
      dispatch({ type: postConstants.FETCH_FEATURED_POSTS_REQUEST })
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.get('/api/v1/posts/featured-post', config)
    const {data: { post } } = data
    dispatch({ type: postConstants.FETCH_FEATURED_POSTS_SUCCESS, payload: post})
  } catch (error) {
    dispatch({ type: postConstants.FETCH_FEATURED_POSTS_FAIL, payload: error })
  }
}
export const fetchPost =(slug) => async (dispatch) => {
    try {
      dispatch({ type: postConstants.FETCH_SINGLE_POST_REQUEST })
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.get(`/api/v1/posts/${slug}`, config)

    const { data: {data:post} } = data
    dispatch({ type: postConstants.FETCH_SINGLE_POST_SUCCESS, payload: post})
  } catch (error) {
    dispatch({ type: postConstants.FETCH_SINGLE_POST_FAIL, payload: error })
  }
}