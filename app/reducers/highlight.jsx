
import axios from 'axios'

/* ------------------    ACTIONS    --------------------- */

const SET = 'SET_CURRENT_PARAGRAPH'
const REMOVE = 'REMOVE_CURRENT_PARAGRAPH'

/* --------------    ACTION CREATORS    ----------------- */

const set = paragraph => ({ type: SET, paragraph })
const remove = () => ({ type: REMOVE })

/* ------------------    REDUCER    --------------------- */

export default function reducer(paragraph = null, action) {
  switch (action.type) {
  case SET:
    return action.paragraph
  case REMOVE:
    return null
  default:
    return paragraph
  }
}

/* ------------       THUNK CREATORS ------------------ */

// export const getParagraph = (paragraphId) => dispatch => {
//   axios.get(`/api/paragraphs/${paragraphId}`)
//        .then(res => dispatch(init(res.data)))
//        .catch(err => console.error(`Getting paragraphs was unsuccesful`, err))
// }

export const setParagraph = (paragraph) => dispatch => {
	dispatch(set(paragraph))
}

export const removeParagraph = () => dispatch => {
	dispatch(remove(paragraph))
}

// export const removeParagraph = (paragraphId) => dispatch => {
//   axios.get(`/api/paragraphs/${paragraphId}`)
//        .then(res => dispatch(init(res.data)))
//        .catch(err => console.error(`Getting paragraphs was unsuccesful`, err))
// }
