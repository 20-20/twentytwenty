import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_TOPICS'

/* ------------   ACTION CREATORS     ------------------ */

const init = topics => ({ type: INITIALIZE, topics })

/* ------------       REDUCER     ------------------ */

export default function reducer(topics = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.topics
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

