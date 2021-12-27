import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchAllPostsReducer, featuredPostReducer, fetchSinglePostReducer } from './reducers/postReducers'
import { commentCreateReducer } from './reducers/commentReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'


const reducers = combineReducers({
  fetchAllPosts:    fetchAllPostsReducer,
  featuredPost:     featuredPostReducer,
  fetchSinglePost:  fetchSinglePostReducer,
  userLogin:        userLoginReducer,
  userRegister:        userRegisterReducer,
  commentCreate:    commentCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store