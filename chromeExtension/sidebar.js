import axios from 'axios'
import stringSimilarity from 'string-similarity'
import renderLoginPrompt from './loginPrompt'
import renderComments, { postComment, commentDisplay } from './comments'
import { style, appendSidebar, sidebarToggle, toggleButton } from './domAdditions'

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

function renderChrExt(currentUser) {
	storeCurrentUser(currentUser)
	renderComments()
	showButton(currentUser.name)
	appendFormSubmission()
	clickHandler()
}

function storeCurrentUser(currentUser) {
	chrome.storage.local.set(currentUser)
}

function showButton(name) {
	// Add the sidebar to the page
	$('head').append(style)
	appendSidebar(name)
	$('body').append(sidebarToggle)
	$('.annotate-toggle').append(toggleButton)
	$('.annotate-toggle').click(extensionToggle)
}

export function extensionToggle() {
	$('.annotate-sidebar').toggle()
	$('.annotate-toggle').toggleClass('far-right')
	if ($('.iconText').text().length) {
		$('.iconText').text('')
		$('.iconText').append(`<i class='fa fa-globe'></i>`)
	} else $('.iconText').append(`20-20`)
  // focus user input into comment text box
  $('.annotate-text-entry').focus()
}

function appendFormSubmission() {
	$('#formSubmission').submit(function(evt) {
		evt.preventDefault()
		secureCommentContext()
	})
}

// maybe move secureCommentContext and paragraphMatch to new file -Jason
function secureCommentContext(currentUser) {
	const commentText = $('.annotate-text-entry').val()
	chrome.storage.local.get(
		['currentUser', 'currentArticle', 'selectedText', 'paragraphs'],
			({ currentUser, currentArticle, selectedText, paragraphs}) => {
			const articleId = currentArticle.id
			const paragraphId = (selectedText === null)
				? 999
				: paragraphMatch(paragraphs, selectedText)
			postAndDisplayComment(currentUser, commentText, articleId, paragraphId)
		}
	)
}

function paragraphMatch(paragraphs, selectedText) {
	const paragraphText = paragraphs.map(paragraph => paragraph.text)
	const { bestMatch } = stringSimilarity.findBestMatch(selectedText, paragraphText)
	const selectedParagraph = paragraphs.filter(
		(paragraph) => paragraph.text === bestMatch.target
	)
	return selectedParagraph[0].id
}

function postAndDisplayComment(currentUser, text, article_id, paragraph_id) {
	postComment({
		article_id,
		paragraph_id,
		text,
		user_id: currentUser.id
	})
		.then(newComment => newComment.data)
		.then(newComment => {
			const commentHTML = commentDisplay(currentUser.name, newComment)
			$('.annotate-list').append($(`${commentHTML}`))
			$('.annotate-text-entry').val('')
		})
}

function clickHandler() {
	$('.panel').on('click', evt => {
		console.log("event target", evt.target)
		// console.log("LOOKY HERE:", evt)
	})
}

