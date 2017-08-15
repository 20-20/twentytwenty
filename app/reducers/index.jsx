import { combineReducers } from 'redux'
import trending from './trending'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  trending
})

export default rootReducer
