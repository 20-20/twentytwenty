import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_TOPICS'
const RESET = 'RESET_TOPICS'

/* ------------   ACTION CREATORS     ------------------ */

const init = topics => ({ type: INITIALIZE, topics })
const reset = () => ({ type: RESET })

/* ------------       REDUCER     ------------------ */

export default function reducer(topics = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.topics
  case RESET:
    return []
  default:
    return topics
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchArticlesByTopics = (topic) => dispatch => {
  axios.get(`/api/topics/${topic}`)
    .then(res => {
      console.log('res', res.data)
      return dispatch(init(res.data))
    })
}

export const resetArticlesByTopics = () => dispatch => {
      return dispatch(reset())
    }

