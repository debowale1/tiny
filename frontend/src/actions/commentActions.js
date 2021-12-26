import * as commentConstants from '../constants/commentConstants'
import axios from 'axios'

export const writeCommentOnPost = (commentData) => async (dispatch) => {
  try {
    dispatch({type: commentConstants.COMMENT_CREATE_ON_POST_REQUEST})
    // get currently logged in user id from the state
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post(`/api/v1/posts/${commentData.postId}/comments`, commentData, config)
    console.log(data);
    dispatch({type: commentConstants.COMMENT_CREATE_ON_POST_SUCCESS})
    
    
  } catch (error) {
    dispatch({type: commentConstants.COMMENT_CREATE_ON_POST_FAIL, payload: error })
  }
}