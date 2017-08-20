
import axios from 'axios'

$(document).ready(function() {
  console.log('inside document ready function to grab article')
  const url = encodeURIComponent($(document)[0].URL)
  console.log('here is the url:', url)
  axios.post(`http://localhost:1337/api/singleArticle/${url}`)
  // `http://localhost:1337/api/singleArticle/${url}` commented out for ngrock
  .then(article => {
    console.log('HERE IS THE ARTICLE:', article)
    chrome.storage.local.set(article.data, () => console.log('here is the article', article))
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
