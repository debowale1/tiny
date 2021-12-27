import * as commentConstants from '../constants/commentConstants'

export const commentCreateReducer = (state = { }, action) => {
  switch (action.type) {
    case commentConstants.COMMENT_CREATE_ON_POST_REQUEST:
      return {...state, loading: true}
    case commentConstants.COMMENT_CREATE_ON_POST_SUCCESS:
      return {loading: false, success: true }
    case commentConstants.COMMENT_CREATE_ON_POST_FAIL:
      return {loading: false, error: action.payload }
    default:
      return state
  }
}