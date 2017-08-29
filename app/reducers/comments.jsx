
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_COMMENTS'
const CREATE = 'CREATE_COMMENT'

/* ------------   ACTION CREATORS     ------------------ */

const init = comments => ({ type: INITIALIZE, comments })
const create = comment => ({ type: CREATE, comment })

/* ------------       REDUCER     ------------------ */

export default function reducer(comments = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.comments
  case CREATE:
    return [...comments, action.comment]
  default:
    return comments
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchComments = articleId => dispatch => {
  axios.get(`/api/comments/${articleId}`)
       .then(res => dispatch(init(res.data)))
       .catch(err => console.error(`Getting comments was unsuccesful`, err))
}

export const addComment = comment => dispatch => {
  axios.post(`/api/comments`, comment)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating comment: ${comment} unsuccesful`, err))
}
