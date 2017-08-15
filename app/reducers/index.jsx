import { combineReducers } from 'redux'
import trending from './trending'
import singleArticle from './singleArticle'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  trending,
  singleArticle
})

export default rootReducer
