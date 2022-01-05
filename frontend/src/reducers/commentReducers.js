import * as commentConstants from '../constants/commentConstants'

export const commentCreateReducer = (state = { }, action) => {
  switch (action.type) {
    case commentConstants.COMMENT_CREATE_ON_POST_REQUEST:
      return {loading: true}
    case commentConstants.COMMENT_CREATE_ON_POST_SUCCESS:
      return {loading: false, success: true }
    case commentConstants.COMMENT_CREATE_ON_POST_FAIL:
      return {loading: false, error: action.payload }
    default:
      return state
  }
}

export const commentListReducer = (state= { comments: [] }, action) => {
  switch (action.type) {
    case commentConstants.COMMENT_LIST_REQUEST:
      return { loading: true }
    case commentConstants.COMMENT_LIST_SUCCESS:
      return { loading: false, comments: action.payload }
    case commentConstants.COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state
  }
}