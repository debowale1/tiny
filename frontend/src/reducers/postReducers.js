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


export const fetchPostsByCategoryReducer = (state = { posts: [] }, action) => {
  switch(action.type){
    case postConstants.FETCH_POSTS_BY_CATEGORY_REQUEST:
      return { loading: true}
    case postConstants.FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return { loading: false, posts: action.payload }
    case postConstants.FETCH_POSTS_BY_CATEGORY_FAIL:
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
export const fetchSinglePostReducer = (state = { post: {} }, action) => {
  switch(action.type){
    case postConstants.FETCH_SINGLE_POST_REQUEST:
      return { loading: true }
    case postConstants.FETCH_SINGLE_POST_SUCCESS:
      return { loading: false, post: action.payload }
    case postConstants.FETCH_SINGLE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createPostReducer = (state = { post: {}}, action) => {
  switch(action.type){
    case postConstants.CREATE_POST_REQUEST:
      return { loading: true}
    case postConstants.CREATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload }
    case postConstants.CREATE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const postUpdateReducer = (state = { post: {} }, action) => {
  switch(action.type){
    case postConstants.UPDATE_POST_REQUEST:
      return { loading: true }
    case postConstants.UPDATE_POST_SUCCESS:
      return { loading: false, success: true }
    case postConstants.UPDATE_POST_FAIL:
      return { loading: false, error: action.payload }
    case postConstants.UPDATE_POST_RESET:
      return { post: {} }
    default:
      return state
  }
}

export const postDeleteReducer = (state = {}, action) => {
  switch(action.type){
    case postConstants.DELETE_POST_REQUEST:
      return { loading: true }
    case postConstants.DELETE_POST_SUCCESS:
      return { loading: false, success: true }
    case postConstants.DELETE_POST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}