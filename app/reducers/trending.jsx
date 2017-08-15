import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_TRENDING'

/* ------------   ACTION CREATORS     ------------------ */

const init = trending => ({ type: INITIALIZE, trending })

/* ------------       REDUCERS     ------------------ */

export default function reducer(trending = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.trending
  default:
    return trending
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchTrending = () => dispatch => {
  console.log('herererere')
  axios.get('/api/trending')
        .then(res => dispatch(init(res.data)))
        .catch(err => console.error('Fetching products unsuccessful', err))
}
