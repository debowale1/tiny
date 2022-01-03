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
import { 
  commentCreateReducer 
} from './reducers/commentReducers'
import { 
  userLoginReducer, 
  userRegisterReducer, 
  userListReducer,
  userDetailsReducer,
  userMyDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  userCreateReducer,
  userUpdateReducer,
  userDeleteReducer,
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
  userList:                userListReducer,
  userDetails:             userDetailsReducer,
  userMyDetails:             userMyDetailsReducer,
  userUpdateProfile:       userUpdateProfileReducer,
  userUpdatePassword:      userUpdatePasswordReducer,
  userCreate:              userCreateReducer,
  userDelete:              userDeleteReducer,
  userUpdate:              userUpdateReducer,
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