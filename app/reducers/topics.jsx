import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_TOPICS'
const CREATE = 'CREATE_TOPIC'
export const REMOVE = 'REMOVE_TOPIC'
const UPDATE = 'UPDATE_TOPIC'

/* ------------   ACTION CREATORS     ------------------ */

const init = topics => ({ type: INITIALIZE, topics })
export const create = topic => ({ type: CREATE, topic })
const remove = id => ({ type: REMOVE, id })
const update = topic => ({ type: UPDATE, topic })

/* ------------       REDUCER     ------------------ */

export default function reducer(topics = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.topics
  case CREATE:
    return [action.topic, ...topics]
  case REMOVE:
    return topics.filter(topic => topic.id !== action.id)
  case UPDATE:
    return topics.map(topic => (
        action.topic.id === topic.id ? action.topic : topic
      ))
  default:
    return topics
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchTopics = () => dispatch => {
  axios.get('/api/topics')
    .then(res => dispatch(init(res.data)))
}

// optimistic
export const removeTopic = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/topics/${id}`)
    .catch(err => console.error(`Removing Topic: ${id} unsuccesful`, err))
}

export const addTopic = topic => dispatch => {
  axios.post('/api/topics', topic)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating Topic: ${topic} unsuccesful`, err))
}

export const updateTopic = (id, topic) => dispatch => {
  axios.put(`/api/topics/${id}`, topic)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating Topic: ${topic} unsuccesful`, err))
}

