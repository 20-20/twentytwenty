
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_ARTICLE'

/* ------------   ACTION CREATORS     ------------------ */

const init = singleArticle => ({ type: INITIALIZE, singleArticle })

/* ------------       REDUCER     ------------------ */

export default function reducer(singleArticle = null, action) {
  switch (action.type) {
  case INITIALIZE:
    return action.singleArticle

  default:
    return singleArticle
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchArticle = (id) => dispatch => {
  axios.get(`/api/singleArticle/${id}`)
       .then(res => dispatch(init(res.data)))
}
