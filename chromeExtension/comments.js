
import axios from 'axios'

// $(document).ready(function() {
export default function renderComments() {
  const url = encodeURIComponent($(document)[0].URL)
  axios.post(`http://localhost:1337/api/singleArticle/${url}`)
  // `http://localhost:1337/api/singleArticle/${url}` commented out for ngrock
  .then(article => {
    console.log("HERE IS THE ARTICLE", article)
    chrome.storage.local.set({ 'currentArticle': article.data })
    fetchArticleData(article.data)
  })
  .catch('Could not fetch article data')
}

function fetchArticleData(article) {
  article.paragraphs.forEach(paragraph => {
    // sort comment order -Jason
    paragraph.comments.forEach(comment => {
      fetchCommenter(comment.user_id)
        .then(user => {
          $('.media-content').append(
            commentDisplay(user.name, comment)
          )
        })
    })
  })
}

export function commentDisplay(userName, comment) {
  return (
    `

    <div class='content'>
      <p class='is-size-7 rightBuffer'>
        <strong>${userName}</strong>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
        <br>
        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
      </p>
    </div>

    `







    `<a id=${comment.id} class="panel-block is-active">
      <span class="panel-icon">
        <i class="fa fa-comment-o"></i>
      </span>
      <strong>${userName}</strong>
      : ${comment.text}
    </a>`
  )
}

/* Axios requests below */

export function postComment(comment) {
  return axios.post(`http://localhost:1337/api/comments`, comment)
  // `http://localhost:1337/api/comments` commented out for ngrok
    .then(newComment => newComment.data)
		.catch('Comment was NOT successfully added to db')
}

function fetchCommenter(userId) {
  return axios.get(`http://localhost:1337/api/users/${userId}`)
    .then(user => user.data)
}
