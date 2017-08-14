
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_COMMENTS'
const CREATE = 'CREATE_COMMENT'
export const REMOVE = 'REMOVE_COMMENT'
const UPDATE = 'UPDATE_COMMENT'

/* ------------   ACTION CREATORS     ------------------ */

const init = comments => ({ type: INITIALIZE, comments })
export const create = comment => ({ type: CREATE, comment })
const remove = id => ({ type: REMOVE, id })
const update = comment => ({ type: UPDATE, comment })

/* ------------       REDUCER     ------------------ */

export default function reducer(comments = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.comments

  case CREATE:
    return [action.comment, ...comments]

  case REMOVE:
    return comments.filter(comment => comment.id !== action.id)

  case UPDATE:
    return comments.map(comment => (
      action.comment.id === comment.id ? action.comment : comment
    ))

  default:
    return comments
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchcomments = () => dispatch => {
  axios.get('/api/comments')
       .then(res => dispatch(init(res.data)))
}

export const addcomment = comment => dispatch => {
  axios.post('/api/comments', comment)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating comment: ${comment} unsuccesful`, err))
}

export const updatecomment = (id, comment) => dispatch => {
  axios.put(`/api/comments/${id}`, comment)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating comment: ${comment} unsuccesful`, err))
}

// optimistic
export const removecomment = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/comments/${id}`)
       .catch(err => console.error(`Removing comment: ${id} unsuccesful`, err))
}
