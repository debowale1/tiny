import * as commentConstants from '../constants/commentConstants'
import axios from 'axios'

export const writeCommentOnPost = (commentData) => async (dispatch, getState) => {
  try {
    dispatch({type: commentConstants.COMMENT_CREATE_ON_POST_REQUEST})
    const { userLogin: { userInfo } } = getState()
    // get currently logged in user id from the state
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.post(`/api/v1/posts/${commentData.postId}/comments`, commentData, config)
    dispatch({type: commentConstants.COMMENT_CREATE_ON_POST_SUCCESS})
    
    
  } catch (error) {
    dispatch({
      type: commentConstants.COMMENT_CREATE_ON_POST_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}

export const listComments = () => async (dispatch, getState) => {
    try {
      dispatch({ type: commentConstants.COMMENT_LIST_REQUEST })
      const { userLogin: { userInfo } } = getState()
      // get currently logged in user id from the state
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const {data} = await axios.get('/api/v1/comments', config)
      const { data: { comments } } = data
      dispatch({ type: commentConstants.COMMENT_LIST_SUCCESS, payload: comments })

    } catch (error) {
      dispatch({ 
        type: commentConstants.COMMENT_LIST_SUCCESS, 
        payload:  error.response && error.response.data.message ? error.response.data.message : error.message
      })
    }
}