import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchAllPostsReducer } from './reducers/postReducers'


const reducers = combineReducers({
  fetchAllPosts: fetchAllPostsReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store