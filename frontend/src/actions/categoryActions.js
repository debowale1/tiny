import * as categoryConstants from '../constants/categoryConstants'
import axios from 'axios'

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: categoryConstants.FETCH_ALL_CATEGORY_REQUEST })
  // make request to fetch posts
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const {data} = await axios.get('/api/v1/categories', config)
  const {data: { data:categories } } = data
  dispatch({ type: categoryConstants.FETCH_ALL_CATEGORY_SUCCESS, payload: categories})
} catch (error) {
  dispatch({ type: categoryConstants.FETCH_ALL_CATEGORY_FAIL, payload: error.message })
}
}