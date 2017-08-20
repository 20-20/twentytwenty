import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_TOPSTORIES'
const UPDATE = 'UPDATE_TOPSTORIES'

/* ------------   ACTION CREATORS     ------------------ */

const init = topStories => ({ type: INITIALIZE, topStories })
const update = topStories => ({ type: UPDATE, topStories })

/* ------------       REDUCER     ------------------ */

export default function reducer(topStories = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.topStories

  case UPDATE:
    return topStories.map(topStories => (
      action.topStories.id === topStories.id ? action.topStories : topStories
    ))

  default:
    return topStories
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchTopStories = () => dispatch => {
  axios.get(`/api/topStories`)
       .then(res => {
         console.log('res.data:', res.data)
         dispatch(init(res.data))
       })
}