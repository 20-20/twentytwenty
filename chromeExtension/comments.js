
import axios from 'axios'

$(document).ready(function() {
  const url = encodeURIComponent($(document)[0].URL)
  axios.post(`http://localhost:1337/api/singleArticle/${url}`)
  // `http://localhost:1337/api/singleArticle/${url}` commented out for ngrock
  .then(article => {
    chrome.storage.local.set(article.data)
    fetchArticleData(article.data)
  })
  .catch('Could not fetch article data')
})

function fetchArticleData(article) {
  article.paragraphs.forEach(paragraph => {
    paragraph.comments.forEach(comment => {
      const comments =
        `<a class="panel-block is-active">
          <span class="panel-icon">
            <i class="fa fa-book"></i>
              </span>
                ${comment.text}
            </a>`
      $('.annotate-list').append($(`${comments}`))
    })
  })
}
