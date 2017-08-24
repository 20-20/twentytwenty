
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_ARTICLE'
const UPDATE = 'UPDATE_ARTICLE'

/* ------------   ACTION CREATORS     ------------------ */

const init = singleArticle => ({ type: INITIALIZE, singleArticle })
const update = singleArticle => ({ type: UPDATE, singleArticle })

/* ------------       REDUCER     ------------------ */

export default function reducer(singleArticle = {}, action) {
  switch (action.type) {
  case INITIALIZE:
    return action.singleArticle

  case UPDATE:
    return action.singleArticle

  default:
    return singleArticle
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchArticle = (id) => dispatch => {
  console.log('fetch article thunk called')
  axios.get(`/api/singleArticle/${id}`)
       .then(res => dispatch(init(res.data)))
}

export const updateArticle = (id, article) => dispatch => {
  axios.put(`/api/singleArticle/${id}`, article)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating article: ${article} unsuccesful`, err))
}
