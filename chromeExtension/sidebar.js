import axios from 'axios'
import stringSimilarity from 'string-similarity'
import renderLoginPrompt from './loginPrompt'

/* Relevnat HTML */
const style =
	`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`
function appendSidebar(name) {
	const sidebar =
	`
		<div class='annotate-sidebar' style='display: none'>
			<div class='level'>
				<div class="level-item has-text-centered">Hello ${name}</div>
			</div>
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
	$('body').append(sidebar)

}
const sidebarToggle = '<div class="annotate-toggle far-right "></div>'
const toggleButton =
	`
	<a
    class='button iconText is-dark is-medium is-focused'>
    <i class='fa fa-globe'></i>20-20
	</a>
`
/* Relevant Code */
$(document).ready(function() {
	axios.get(`http://localhost:1337/api/auth/whoami`)
		.then(res => {
			res.data
				? renderChrExt(res.data)
				: renderLoginPrompt()
		})
})
function checkLogin() {
	axios.get(`http://localhost:1337/api/auth/whoami`)
		.then(res => res.data)
		.catch(err => console.error('Problem fetching current user', err))
}
function renderChrExt(user) {
	storeCurrentUser(user)
	// displayHello(user.name)
	showButton(user.name)
	appendFormSubmission()
}
function storeCurrentUser(user) {
	chrome.storage.local.set({ currentUser: user })
}
// function displayHello(name) {
// 	$('annotate-sidebar').append(
// 		`<hr class='title is-4'>${name}</h4>`
// 	)
// }
function showButton(name) {
	// Add the sidebar to the page
	$('head').append(style)
	appendSidebar(name)
	// $('body').append(appendSidebar(name))
	$('body').append(sidebarToggle)
	$('.annotate-toggle').append(toggleButton)
	appendToggle()
}
function appendToggle() {
	$('.annotate-toggle').click(function() {
		$('.annotate-sidebar').toggle()
		$('.annotate-toggle').toggleClass('far-right')
		if ($('.iconText').text().length) {
			$('.iconText').text('')
			$('.iconText').append(`<i class='fa fa-globe'></i>`)
		} else $('.iconText').append(`20-20`)
	})
}
function postComment(comment) {
	axios.post(`http://localhost:1337/api/comments`, comment)
	// `http://localhost:1337/api/comments` ocmmented out for ngrok
		.catch('Comment was NOT successfully added to db')
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
		displayComment(comment)
	})
}
function displayComment(comment) {
	// Post comment to database
	chrome.storage.local.get(
		['selectedText', 'paragraphs'], ({ selectedText, paragraphs }) => {
			const paragraphText = paragraphs.map(paragraph => paragraph.text)
			const { bestMatch } = stringSimilarity.findBestMatch(selectedText, paragraphText)
			const selectedParagraph = paragraphs.filter((paragraph) => paragraph.text === bestMatch.target)
			console.log("params:", selectedParagraph[0])
			console.log("comment", comment)
			postComment({
				article_id: selectedParagraph[0].article_id,
				paragraph_id: selectedParagraph[0].id,
				text: comment
			})
		}
	)
}
