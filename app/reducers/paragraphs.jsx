
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_PARAGRAPHS'

/* ------------   ACTION CREATORS     ------------------ */

const init = paragraphs => ({ type: INITIALIZE, paragraphs })

/* ------------       REDUCER     ------------------ */

export default function reducer(paragraphs = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.paragraphs
  default:
    return paragraphs
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchParagraphs = (articleId) => dispatch => {
  axios.get(`/api/paragraphs/${articleId}`)
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error(`Getting paragraphs was unsuccesful`, err))
}
