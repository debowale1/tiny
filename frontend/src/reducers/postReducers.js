import * as postConstants from './../constants/postConstants'

export const fetchAllPostsReducer = (state = {posts: []}, action) => {
  switch(action.type){
    case postConstants.FETCH_ALL_POSTS_REQUEST:
      return { loading: true}
    case postConstants.FETCH_ALL_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }
    case postConstants.FETCH_ALL_POSTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const featuredPostReducer = (state = {loading: true, featuredPost: {}}, action) => {
  switch(action.type){
    case postConstants.FETCH_FEATURED_POSTS_REQUEST:
      return { loading: true}
    case postConstants.FETCH_FEATURED_POSTS_SUCCESS:
      return { loading: false, post: action.payload }
    case postConstants.FETCH_FEATURED_POSTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const fetchSinglePostReducer = (state = { post: {}}, action) => {
  switch(action.type){
    case postConstants.FETCH_SINGLE_POST_REQUEST:
      return { loading: true}
    case postConstants.FETCH_SINGLE_POST_SUCCESS:
      return { loading: false, post: action.payload }
    case postConstants.FETCH_SINGLE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}