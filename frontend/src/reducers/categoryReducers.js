import * as categoryConstants from './../constants/categoryConstants'

export const fetchCategoriesReducer = (state = { categories: [] }, action) => {
  switch(action.type){
    case categoryConstants.FETCH_ALL_CATEGORY_REQUEST:
      return { loading: true }
    case categoryConstants.FETCH_ALL_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload }
    case categoryConstants.FETCH_ALL_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const fetchCategoryReducer = (state = { category: {} }, action) => {
  switch(action.type){
    case categoryConstants.FETCH_CATEGORY_REQUEST:
      return { loading: true }
    case categoryConstants.FETCH_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload }
    case categoryConstants.FETCH_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createCategoryReducer = (state = { category: {}}, action) => {
  switch(action.type){
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      return { loading: true}
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload }
    case categoryConstants.CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    case categoryConstants.CREATE_CATEGORY_RESET:
      return { category: {} }
    default:
      return state
  }
}

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch(action.type){
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      return { loading: true }
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { loading: false, success: true }
    case categoryConstants.UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    case categoryConstants.UPDATE_CATEGORY_RESET:
      return { category: {} }
    default:
      return state
  }
}

export const categoryDeleteReducer = (state = {}, action) => {
  switch(action.type){
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      return { loading: true }
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true }
    case categoryConstants.DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}