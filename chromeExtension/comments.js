
import axios from 'axios'

// $(document).ready(function() {
export default function renderComments() {
  const url = encodeURIComponent($(document)[0].URL)
  axios.post(`http://localhost:1337/api/singleArticle/${url}`)
  // `http://localhost:1337/api/singleArticle/${url}` commented out for ngrock
  .then(article => {
    chrome.storage.local.set({ 'currentArticle': article.data })
    fetchArticleData(article.data)
  })
  .catch('Could not fetch article data')
}

function fetchArticleData(article) {
  article.paragraphs.forEach(paragraph => {
    paragraph.comments.forEach(comment => {
      fetchCommenter(comment.user_id)
        .then(user => {
          $('.contentHere').append(
            commentDisplay(user.name, comment)
          )
        })
    })
  })
}

export function commentDisplay(userName, comment) {
  return (
    `
    <article class='media'>
      <figure class='media-left'>
        <p class='image is-48x48 leftBuffer'>
          <img src='http://bulma.io/images/placeholders/128x128.png'>
        </p>
      </figure>
      <div class='media-content' id=${comment && comment.id}>
        <div class='content'>
          <p class='is-size-7 rightBuffer'>
            <strong>${userName}</strong>
            <br>${comment.text}<br>
            <small><a>Like</a> · <a>Reply</a>
            <br>
          </p>
        </div>
      </div>
    </article>
    `
  )
}

/* Axios requests below */

export function postComment(comment) {
  return axios.post(`http://localhost:1337/api/comments`, comment)
    .then(newComment => newComment.data)
		.catch('Comment was NOT successfully added to db')
}

function fetchCommenter(userId) {
  return axios.get(`http://localhost:1337/api/users/${userId}`)
    .then(user => user.data)
}
