import { combineReducers } from 'redux'
import trending from './trending'
import singleArticle from './singleArticle'
import comments from './comments'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  trending,
  singleArticle,
  comments
})

export default rootReducer
