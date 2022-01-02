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
  postDeleteReducer
} from './reducers/postReducers'
import { commentCreateReducer } from './reducers/commentReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
} from './reducers/userReducers'
import { 
  fetchCategoriesReducer, 
  fetchCategoryReducer, 
  createCategoryReducer,
  categoryUpdateReducer, 
  categoryDeleteReducer 
} from './reducers/categoryReducers'


const reducers = combineReducers({
  fetchAllPosts:           fetchAllPostsReducer,
  fetchPostsByCategory:    fetchPostsByCategoryReducer,
  featuredPost:            featuredPostReducer,
  fetchSinglePost:         fetchSinglePostReducer,
  createPost:              createPostReducer,
  postUpdate:              postUpdateReducer,
  postDelete:              postDeleteReducer,
  userLogin:               userLoginReducer,
  userRegister:            userRegisterReducer,
  userDetails:             userDetailsReducer,
  userUpdateProfile:       userUpdateProfileReducer,
  userUpdatePassword:      userUpdatePasswordReducer,
  commentCreate:           commentCreateReducer,
  fetchCategories:         fetchCategoriesReducer,
  fetchCategory:           fetchCategoryReducer,
  createCategory:          createCategoryReducer,
  categoryUpdate:          categoryUpdateReducer,
  categoryDelete:          categoryDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store