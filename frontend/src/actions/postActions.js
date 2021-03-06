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
    const {data} = await axios.get(`/api/v1/posts`, config)
    const {data: { posts } } = data
    dispatch({ type: postConstants.FETCH_ALL_POSTS_SUCCESS, payload: posts})
  } catch (error) {
    dispatch({ type: postConstants.FETCH_ALL_POSTS_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}
export const searchPosts = (keyword) => async (dispatch) => {
    try {
      dispatch({ type: postConstants.SEARCH_POSTS_REQUEST })
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data:posts} = await axios.get(`/api/v1/posts/search?keyword=${keyword}`, config)
    
    dispatch({ type: postConstants.SEARCH_POSTS_SUCCESS, payload: posts})
  } catch (error) {
    dispatch({ type: postConstants.SEARCH_POSTS_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
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
    dispatch({ type: postConstants.FETCH_POSTS_BY_CATEGORY_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
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
    dispatch({ type: postConstants.FETCH_FEATURED_POSTS_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
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
    dispatch({ type: postConstants.FETCH_SINGLE_POST_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}

export const createNewPost =(postData) => async (dispatch, getState) => {
  try {
    dispatch({ type: postConstants.CREATE_POST_REQUEST })
    const {userLogin: { userInfo } } = getState()
  // make request to fetch posts
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  const {data} = await axios.post(`/api/v1/posts`, postData, config)

  console.log(data);
  dispatch({ type: postConstants.CREATE_POST_SUCCESS, payload: data})
} catch (error) {
  dispatch({ type: postConstants.CREATE_POST_FAIL, 
    payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
}
}

export const updatePost =(postData) => async (dispatch, getState) => {
  try {
    dispatch({ type: postConstants.UPDATE_POST_REQUEST })
    const {userLogin: { userInfo } } = getState()
  // make request to fetch posts
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  await axios.patch(`/api/v1/posts/${postData._id}`, postData, config)

  dispatch({ type: postConstants.UPDATE_POST_SUCCESS })
} catch (error) {
    dispatch({ type: postConstants.UPDATE_POST_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: postConstants.DELETE_POST_REQUEST })

    const {userLogin: { userInfo } } = getState()
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`/api/v1/posts/${id}`, config)

    dispatch({ type: postConstants.DELETE_POST_SUCCESS })

  } catch (error) {
    dispatch({ type: postConstants.DELETE_POST_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}