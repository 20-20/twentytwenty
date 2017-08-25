
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
  article.comments.forEach(comment => {
    // sort comment order -Jason
    console.log("fetching user for comment", comment)
    fetchCommenter(comment.user_id)
      .then(user => {
        console.log("displaying comment", comment)
        // Use Promise.resolve b/c can only add handler
        // once comment has rendered
        commentDisplay(user.name, comment)
        // Promise.resolve($('.contentHere').append(
        //   commentDisplay(user.name, comment)
        // ))
        //   .then(() => addHoverHandler())
      })
  })
}

// Keep in case want to add paragraph words in side panel...
// function fetchArticleData(article) {
//   console.log("inside fetch")
//   article.paragraphs.forEach(paragraph => {
//     // sort comment order -Jason
//     console.log("this is a paragraph", paragraph)
//     paragraph.comments.forEach(comment => {
//       console.log("fetching user for comment", comment)
//       fetchCommenter(comment.user_id)
//         .then(user => {
//           console.log("displaying comment", comment)
//           $('.contentHere').append(
//             commentDisplay(user.name, comment)
//           )
//         })
//     })
//   })
// }

export function commentDisplay(userName, comment) {
  const newHTML =
    `
    <article class='media indComment' commentId=${comment && comment.id}>
      <figure class='media-left'>
        <p class='image is-48x48 leftBuffer'>
          <img src='http://bulma.io/images/placeholders/128x128.png'>
        </p>
      </figure>
      <div class='media-content'>
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
    Promise.resolve($('.contentHere').append(newHTML))
      .then(() => addHoverHandler(comment))

}


function addHoverHandler(comment) {
  $(`article[commentId='${comment.id}']`).hover(
    (evt) => {
      const node = parentTraversal(evt)
      $(node).addClass('hoverHighlight')
      comment.domElText && comment.domElType && highlightParagraph(comment)
    },
    (evt) => {
  		const node = parentTraversal(evt)
			if ($(node).attr('class') &&
				$(node).attr('class').includes('hoverHighlight')) {
          $(node).removeClass('hoverHighlight')
          comment.domElText && comment.domElType && unHighlightParagraph(comment)
        }
    }
  )
}

function parentTraversal(evt) {
	let node = evt.target
	while (!$(node).attr('class') ||
		!$(node).attr('class').includes('indComment')) {
		node = node.parentNode
	}
	return node
}

function highlightParagraph(comment) {
  $(`${comment.domElType}:contains(${comment.domElText})`).addClass('hoverHighlight')
  // add focus here...
}

function unHighlightParagraph(comment) {
  $(`${comment.domElType}:contains(${comment.domElText})`).removeClass('hoverHighlight')
  // add focus here...
}



// function highlightParagh(commentId) {
//   const textCommentId = ''+commentId
// 	chrome.storage.local.get(textCommentId, (selectedText) => console.log("HERE IS THE COMMENTID:",selectedText))
//   // chrome.storage.local.get(textCommentId, (text) => {
//   //   $(`:${text}`).addClass('.hoverHighlight')
//   // })
// }






// function fetchParagraphId(commentId) {
//   console.log("entered fetch paragraph id", commentId)
//   axios.get(`http://localhost:1337/api/comments/${commentId}`)
//     .then(res => console.log("HERE IS THE PARAGRAH ID:", res.data.paragraph_id))
//     // .then(res => fetchParagraph(res.data.paragraph_id))
// }

// function fetchParagraph(paragraphId) {
//   console.log("here")
// }


	// 	mouseenter: (evt) => {
	// 		const node = parentTraversal(evt)
	// 		$(node).addClass('hoverHighlight')
	// 		console.log("entering", node)
	// 	},
	// 	mouseleave: (evt) => {
	// 		const node = parentTraversal(evt)
	// 		if ($(node).attr('class') &&
	// 			$(node).attr('class').includes('hoverHighlight')) {
	// 			$(node).removeClass('hoverHighlight')
	// 		}





// function addClickHandler(comment) {
//   console.log(`commentId${comment.id}`)
//   $(`#commentId${comment.id}`).mouseover(evt => {
//     console.log("event target", evt.target)
//   })

// }

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
