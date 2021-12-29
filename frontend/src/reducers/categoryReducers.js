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