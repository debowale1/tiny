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
  dispatch({ type: categoryConstants.FETCH_ALL_CATEGORY_FAIL, 
    payload:  error.response && error.response.data.message ? error.response.data.message : error.message 
  })
}
}

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: categoryConstants.FETCH_CATEGORY_REQUEST })
  // make request to fetch posts
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const {data} = await axios.get(`/api/v1/categories/${id}`, config)
  const {data: { data:category } } = data
  dispatch({ type: categoryConstants.FETCH_CATEGORY_SUCCESS, payload: category})
  } catch (error) {
    dispatch({ 
      type: categoryConstants.FETCH_CATEGORY_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message 
    })
  }
}


export const createNewCategory = (categoryData) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST })
    const {userLogin: { userInfo } } = getState()
  // make request to fetch posts
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }
  const {data} = await axios.post(`/api/v1/categories`, categoryData, config)

  dispatch({ type: categoryConstants.CREATE_CATEGORY_SUCCESS, payload: data})
} catch (error) {
  dispatch({ type: categoryConstants.CREATE_CATEGORY_FAIL, 
    payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
}
}

export const updateCategory = (categoryData) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })
  
    const {userLogin: { userInfo } } = getState()
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }  
    const {data} = await axios.patch(`/api/v1/categories/${categoryData._id}`, categoryData, config)
  
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS })
    dispatch({ type: categoryConstants.FETCH_CATEGORY_SUCCESS, payload: data})
    
  } catch (error) {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}


export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })

    const {userLogin: { userInfo } } = getState()
    // make request to fetch posts
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`/api/v1/categories/${id}`, config)

    dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS })

  } catch (error) {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_FAIL, 
      payload:  error.response && error.response.data.message ? error.response.data.message : error.message })
  }
}