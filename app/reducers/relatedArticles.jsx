
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_RELATED_ARTICLES'

/* ------------   ACTION CREATORS     ------------------ */

const init = relatedArticles => ({ type: INITIALIZE, relatedArticles })

/* ------------       REDUCER     ------------------ */

export default function reducer(relatedArticles = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.relatedArticles
  default:
    return relatedArticles
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchRelatedArticles = (articleId) => dispatch => {
  axios.get(`/api/relatedArticles/${articleId}`)
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error(`Getting related articles was unsuccesful`, err))
}
