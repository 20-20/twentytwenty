import axios from 'axios'
import { create as createUser } from './users'
import history from '../history'

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

export default function reducer(currentUser = null, action) {
  switch (action.type) {
  case SET:
    return action.user
  case REMOVE:
    return null
  default:
    return currentUser
  }
}

/* ------------       THUNK CREATORS ------------------ */

const resToData = res => res.data

// a "simple" thunk creator which uses API, changes state, and returns a promise.
export const login = credentials => dispatch => axios.put('/api/auth/me', credentials)
    .then(resToData)
    .then(user => {
      dispatch(set(user))
      return user
    })

// a "composed" thunk creator which uses the "simple" one, then routes to a page.
export const loginAndGoToUser = credentials => dispatch => {
  dispatch(login(credentials))
    .then(user => history.push(`/`))
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
    .then(user => history.push(`/`))
    .catch(err => console.error('Problem signing up:', err))
}

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/api/auth/me')
    .then(res => dispatch(set(res.data)))
    .catch(err => console.error('Problem fetching current user', err))
}

// optimistic
export const logout = () => dispatch => {
  dispatch(remove())
  axios.delete('/api/auth/me')
    .catch(err => console.error('logout unsuccessful', err))
}

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        console.log('user', user)
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))
