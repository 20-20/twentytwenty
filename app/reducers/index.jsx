import { combineReducers } from 'redux'
import trending from './trending'
import singleArticle from './singleArticle'
import comments from './comments'
import auth from './auth'
import users from './users'
import topStories from './topStories'

const rootReducer = combineReducers({
  auth,
  users,
  trending,
  comments,
  singleArticle,
  topStories
})

export default rootReducer
