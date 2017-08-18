
import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT = 'SET_CURRENT_ARTICLES'
const UPDATE = 'UPDATE_ARTICLE'

/* ------------   ACTION CREATORS     ------------------ */

const init = articles => ({ type: SET_CURRENT, articles })
const update = article => ({ type: UPDATE, article })

/* ------------       REDUCER     ------------------ */

export default function reducer(articles = [], action) {
  switch (action.type) {
  case SET_CURRENT:
    return action.articles

  case UPDATE:
    return articles.map(article => (
      action.article.id === article.id ? action.article : article
    ))

  default:
    return articles
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchArticle = (id) => dispatch => {
  axios.get(`/api/singleArticle/${id}`)
       .then(res => console.log("resreser",res.data))
       .then(res => dispatch(init(res.data)))
}

export const updateArticle = (id, article) => dispatch => {
  axios.put(`/api/singleArticle/${id}`, article)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating article: ${article} unsuccesful`, err))
}
