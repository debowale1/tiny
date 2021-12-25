import axios from 'axios'
import * as userConstants from '../constants/userConstants'

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST})

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const {data} = await axios.post('/api/v1/users/login', {email: loginData.email, password: loginData.password}, config)
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: data})

    //store logged in user to localstorage
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: userConstants.USER_LOGIN_FAIL, payload: error})
  }
}