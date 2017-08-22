import axios from 'axios'
import stringSimilarity from 'string-similarity'
import renderLoginPrompt from './loginPrompt'

const style =
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`

// const button = '<a class="button is-dark">20-20</a>'

const sidebar =
	`
	<div class='annotate-sidebar' style='display: none'>
		<nav class="panel">
			<p class="panel-heading annotate-header">
				Comments
			</p>
			<div class='annotate-list'>
			</div>
			<form id='formSubmission'>
				<input type=submit class='annotate-save' value='Comment'>
				<input class='annotate-text-entry' placeholder='What do you think?'>
			</form>
		</nav>
	</div>
	`

const sidebarToggle = '<div class="annotate-toggle far-right "></div>'
const toggleButton =
`
<a
	class='button is-dark is-medium is-focused'>
	<i class="fa fa-globe"></i>
	20-20
</a>
`


// const sidebarToggle = '<div class="annotate-toggle far-right "></div>'
// const sidebarToggle =
// 	`<button
// 		class='annotate-toggle far-right'>
// 		<i class="fa fa-globe"></i>
// 		20-20
// 	</button>`







$(document).ready(function() {
	axios.get(`http://localhost:1337/api/auth/whoami`)
		.then(res => {
			res.data
				? renderChrExt()
				: renderLoginPrompt()
		})
})

function checkLogin() {
	axios.get(`http://localhost:1337/api/auth/whoami`)
		.then(res => res.data)
    .catch(err => console.error('Problem fetching current user', err))
}

function renderChrExt() {
	// showButton()
	appendExt()
	appendFormSubmission()
}


function showButton() {
	// Add the sidebar to the page
	$('head').append(style)
	$('body').append(sidebar)
	$('body').append(sidebarToggle)
	$('.annotate-toggle').append(toggleButton)
}





function createComment(comment) {
  axios.post(`http://localhost:1337/api/comments`, comment) // `http://localhost:1337/api/comments` ocmmented out for ngrok
		.catch('Comment was NOT successfully added to db')
}

function appendExt() {
	// Add the sidebar to the page
  $('head').append(style)
  $('body').append(sidebar)
	// Add the Toggle (Hide) Button to the page
	$('body').append(sidebarToggle)
	$('.annotate-toggle').append(toggleButton)
	// Toggle sidebar
  $('.annotate-toggle').click(function() {
    $('.annotate-sidebar').toggle()
		$('.annotate-toggle').toggleClass('far-right')

    if ($('.annotate-toggle').text() === 'X') {
      $('.annotate-toggle').text('<')
    } else {
      $('.annotate-toggle').text('X')
    }
  })
}

function appendFormSubmission() {
	$('#formSubmission').submit(function(evt) {
		// Visually display comment in chrome extension
    evt.preventDefault()
    const comment = $('.annotate-text-entry').val()
    const commentHTML = `
			<a class="panel-block is-active">
				<span class="panel-icon">
					<i class="fa fa-book"></i>
				</span>
				${comment}
			</a>`
    $('.annotate-list').append($(`${commentHTML}`))
    $('.annotate-text-entry').val('')
		// Post comment to database
    chrome.storage.local.get(
    	['selectedText', 'paragraphs'], ({selectedText, paragraphs}) => {
				const paragraphText = paragraphs.map(paragraph => paragraph.text)
				const {bestMatch} = stringSimilarity.findBestMatch(selectedText, paragraphText)
				const selectedParagraph = paragraphs.filter((paragraph) => paragraph.text === bestMatch.target)
				createComment({
					article_id: selectedParagraph[0].article_id,
					paragraph_id: selectedParagraph[0].id,
					text: comment
				})
			}
		)
	})
}

// $(document).ready(function() {
// 	// Add the sidebar to the page
//   $('head').append(style)
//   $('body').append(sidebar)
// 	// Add the Toggle (Hide) Button to the page
//   $('body').append(sidebarToggle)

// 	// Toggle sidebar
//   $('.annotate-toggle').click(function() {
//     $('.annotate-sidebar').toggle()
//     $('.annotate-toggle').toggleClass('far-right')

//     if ($('.annotate-toggle').text() === 'X') {
//       $('.annotate-toggle').text('<')
//     } else {
//       $('.annotate-toggle').text('X')
//     }
//   })

//   $('#formSubmission').submit(function(evt) {
// 	// Visually display comment in chrome extension
//     evt.preventDefault()
//     const comment = $('.annotate-text-entry').val()
//     const commentHTML = `
// 			<a class="panel-block is-active">
// 				<span class="panel-icon">
// 					<i class="fa fa-book"></i>
// 				</span>
// 				${comment}
// 			</a>`
//     $('.annotate-list').append($(`${commentHTML}`))
//     $('.annotate-text-entry').val('')
// 	// Post comment to database
//     chrome.storage.local.get(
//       ['selectedText', 'paragraphs'], ({selectedText, paragraphs}) => {
//         console.log('MAP OBJECT HERE', 'select text:', selectedText, 'paragraphs:', paragraphs)
//         const paragraphText = paragraphs.map(paragraph => paragraph.text)
//         const {bestMatch} = stringSimilarity.findBestMatch(selectedText, paragraphText)
//         const selectedParagraph = paragraphs.filter((paragraph) => paragraph.text === bestMatch.target)
//         createComment({
//           article_id: selectedParagraph[0].article_id,
//           paragraph_id: selectedParagraph[0].id,
//           text: comment
//         })
//       }
// )
//   })
// })
