import { combineReducers } from 'redux'
import trending from './trending'
import singleArticle from './singleArticle'
import comments from './comments'
import auth from './auth'
import users from './users'

const rootReducer = combineReducers({
  auth,
  users,
  trending,
  comments,
  singleArticle,
})

export default rootReducer
