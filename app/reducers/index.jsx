import { combineReducers } from 'redux'
import trending from './trending'
import comments from './comments'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  trending,
  comments
})

export default rootReducer
