import axios from 'axios'
import * as userConstants from '../constants/userConstants'

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post('/api/v1/users/login', {email: loginData.email, password: loginData.password}, config)
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data })
    //store logged in user to localstorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: userConstants.USER_LOGIN_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  //remove userLogin from localStorage
  localStorage.removeItem('userInfo')
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_DETAILS_RESET })
}

export const register = (name, email, password, passwordConfirm) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const {data} = await axios.post('/api/v1/users/signup', {name, email, password, passwordConfirm}, config)
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: data })
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data })
    //store logged in user to localstorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ 
      type: userConstants.USER_REGISTER_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DETAILS_REQUEST })

    const {userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content_Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/v1/users/me`, config)
    const { data: { data:user } } = data
    dispatch({ type: userConstants.USER_DETAILS_SUCCESS, payload: user })
  } catch (error) {
    dispatch({ 
      type: userConstants.USER_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST })

    const {userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content_Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.patch(`/api/v1/users/updateMe`, userData, config)
    const { data: { user } } = data
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: user })
    // localStorage.setItem('userInfo', JSON.stringify(user))
  } catch (error) {
    dispatch({ 
      type: userConstants.USER_UPDATE_PROFILE_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}