import { combineReducers } from 'redux'
import auth from './auth'
import users from './users'
import trending from './trending'
import topStories from './topStories'
import singleArticle from './singleArticle'
import relatedArticles from './relatedArticles'
import comments from './comments'
import paragraphs from './paragraphs'

const rootReducer = combineReducers({
  auth,
  trending,
  topStories,
  comments,
  paragraphs,
  singleArticle,
  relatedArticles,
})

export default rootReducer
