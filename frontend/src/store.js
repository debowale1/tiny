import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchAllPostsReducer, featuredPostReducer, fetchSinglePostReducer } from './reducers/postReducers'
import { commentCreateReducer } from './reducers/commentReducers'


const reducers = combineReducers({
  fetchAllPosts: fetchAllPostsReducer,
  featuredPost: featuredPostReducer,
  fetchSinglePost: fetchSinglePostReducer,
  commentCreate: commentCreateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store