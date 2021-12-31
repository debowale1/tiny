import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
  fetchAllPostsReducer, 
  fetchPostsByCategoryReducer, 
  featuredPostReducer, 
  fetchSinglePostReducer, 
  createPostReducer,
  postUpdateReducer,
} from './reducers/postReducers'
import { commentCreateReducer } from './reducers/commentReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import { fetchCategoriesReducer } from './reducers/categoryReducers'


const reducers = combineReducers({
  fetchAllPosts:    fetchAllPostsReducer,
  fetchPostsByCategory:    fetchPostsByCategoryReducer,
  featuredPost:     featuredPostReducer,
  fetchSinglePost:  fetchSinglePostReducer,
  createPost:       createPostReducer,
  postUpdate:       postUpdateReducer,
  userLogin:        userLoginReducer,
  userRegister:        userRegisterReducer,
  userDetails:      userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  commentCreate:    commentCreateReducer,
  fetchCategories:    fetchCategoriesReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store