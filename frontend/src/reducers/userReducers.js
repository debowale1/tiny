import * as userConstants from '../constants/userConstants'

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.payload) {
    case userConstants.USER_LOGIN_REQUEST:
      return { loading: true }
    case userConstants.USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case userConstants.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case userConstants.USER_LOGOUT:
      return { userInfo: {}}
    default:
      return state;
  }
}
export const userRegisterReducer = (state = {}, action) => {
  switch (action.payload) {
    case userConstants.USER_REGISTER_REQUEST:
      return { loading: true }
    case userConstants.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case userConstants.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USER_LIST_REQUEST:
      return { loading: true }
    case userConstants.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case userConstants.USER_LIST_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state;
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_DETAILS_REQUEST:
      return { loading: true }
    case userConstants.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case userConstants.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }  
    case userConstants.USER_DETAILS_RESET:
      return { user: {} }  
    default:
      return state;
  }
}


export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case userConstants.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state;
  }
}
export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PASSWORD_REQUEST:
      return { loading: true }
    case userConstants.USER_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case userConstants.USER_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload }  
    default:
      return state;
  }
}