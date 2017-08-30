import axios from 'axios'
import { create as createUser } from './users'

/* ------------------    ACTIONS    --------------------- */

const SET = 'SET_CURRENT_USER'
const REMOVE = 'REMOVE_CURRENT_USER'
const AUTHENTICATED = 'AUTHENTICATED'

/* --------------    ACTION CREATORS    ----------------- */

const set = user => ({ type: SET, user })
const remove = () => ({ type: REMOVE })
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

/* ------------------    REDUCER    --------------------- */

export default function reducer(user = null, action) {
  switch (action.type) {
  case SET:
    return action.user
  case AUTHENTICATED:
    return action.user
  case REMOVE:
    return null
  default:
    return user
  }
}

/* ------------       THUNK CREATORS ------------------ */

const resToData = res => res.data

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))



// a "composed" thunk creator which uses the "simple" one, then routes to a page.
export const loginAndGoToUser = credentials => dispatch => {
  dispatch(login(credentials))
    .catch(err => console.error('Problem logging in:', err))
}

export const signup = credentials => dispatch => axios.post('/api/auth/me', credentials)
  .then(resToData)
  .then(user => {
    dispatch(createUser(user)) // so new user appears in our master list
    dispatch(set(user)) // set current user
    return user
  })

export const signupAndGoToUser = credentials => dispatch => {
  dispatch(signup(credentials))
    .catch(err => console.error('Problem signing up:', err))
}

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/api/auth/me')
    .then(res => dispatch(set(res.data)))
    .catch(err => console.error('Problem fetching current user', err))
}

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
