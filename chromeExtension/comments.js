
import axios from 'axios'

// $(document).ready(function() {
export default function renderComments() {
  const url = encodeURIComponent($(document)[0].URL)
  axios.post(`http://localhost:1337/api/singleArticle/${url}`)
  // `http://localhost:1337/api/singleArticle/${url}` commented out for ngrock
  .then(article => {
    console.log("HERE IS THE ARTICLE", article)
    chrome.storage.local.set(article.data)
    fetchArticleData(article.data)
  })
  .catch('Could not fetch article data')
}

function fetchArticleData(article) {
  article.paragraphs.forEach(paragraph => {
    paragraph.comments.forEach(comment => {
      fetchCommenter(comment.user_id)
        .then(user => {
          $('.annotate-list').append(
            commentDisplay(user.name, comment.text)
          )
        })
    })
  })
}

export function commentDisplay(userName, commentText) {
  return (
    `<a class="panel-block is-active">
      <span class="panel-icon">
        <i class="fa fa-comment-o"></i>
      </span>
      <strong>${userName}</strong>
      : ${commentText}
    </a>`
  )
}

/* Axios requests below */

export function postComment(comment) {
	axios.post(`http://localhost:1337/api/comments`, comment)
	// `http://localhost:1337/api/comments` commented out for ngrok
		.catch('Comment was NOT successfully added to db')
}

function fetchCommenter(userId) {
  console.log("entered fetch function. Here is user id", userId)
  return axios.get(`http://localhost:1337/api/users/${userId}`)
    .then(user => user.data)
}
