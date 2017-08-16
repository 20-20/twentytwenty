import { combineReducers } from 'redux'
import trending from './trending'
import comments from './comments'
import singleArticle from './singleArticle'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  trending,
  comments,
  singleArticle
})

export default rootReducer
