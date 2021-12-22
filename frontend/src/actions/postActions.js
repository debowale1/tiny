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