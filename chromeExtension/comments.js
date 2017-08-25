
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
  console.log("inside fetch")
  article.paragraphs.forEach(paragraph => {
    // sort comment order -Jason
    console.log("this is a paragraph", paragraph)
    paragraph.comments.forEach(comment => {
      console.log("fetching user for comment", comment)
      fetchCommenter(comment.user_id)
        .then(user => {
          console.log("displaying comment", comment)
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
  console.log("here is the comment", comment)
  return axios.post(`http://localhost:1337/api/comments`, comment)
  // `http://localhost:1337/api/comments` commented out for ngrok
    // .then(newComment => console.log("HERE IS THE NEW COMMENT:", newComment.data))
    .then(newComment => newComment.data)
		.catch('Comment was NOT successfully added to db')
}

function fetchCommenter(userId) {
  return axios.get(`http://localhost:1337/api/users/${userId}`)
    .then(user => user.data)
}
