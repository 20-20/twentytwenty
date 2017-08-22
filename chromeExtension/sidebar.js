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

function appendFormSubmission() {
	$('#formSubmission').submit(function(evt) {
		// Visually display comment in chrome extension
		evt.preventDefault()
		chrome.storage.local.get('currentUser', currentUser => {
			const comment = $('.annotate-text-entry').val()
			const commentHTML = commentDisplay(currentUser.currentUser.name, comment)
			// const commentHTML = `
			// 	<a class="panel-block is-active">
			// 		<span class="panel-icon">
			// 			<i class="fa fa-book"></i>
			// 		</span>
			// 		<strong>${currentUser.currentUser.name}</strong>
			// 		: ${comment}
			// 	</a>`
			$('.annotate-list').append($(`${commentHTML}`))
			$('.annotate-text-entry').val('')
			sendPostComment(comment, currentUser.currentUser)
		})
	})
}

function sendPostComment(comment, currentUser) {
	// Post comment to database
	chrome.storage.local.get(
		['selectedText', 'paragraphs'], ({ selectedText, paragraphs}) => {
			const paragraphText = paragraphs.map(paragraph => paragraph.text)
			const { bestMatch } = stringSimilarity.findBestMatch(selectedText, paragraphText)
			const selectedParagraph = paragraphs.filter(
				(paragraph) => paragraph.text === bestMatch.target
			)
			console.log("here is the currentUser", currentUser)
			console.log("selecte par", selectedParagraph[0])
			console.log("comment", comment)
			postComment({
				article_id: selectedParagraph[0].article_id,
				paragraph_id: selectedParagraph[0].id,
				text: comment,
				user_id: currentUser.id
			})
		}
	)
}
