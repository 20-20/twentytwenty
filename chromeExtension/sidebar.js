import axios from 'axios'
import stringSimilarity from 'string-similarity'
import renderLoginPrompt from './loginPrompt'
import renderComments, { postComment, commentDisplay, addHoverHandler } from './comments'
import { style, appendSidebar, sidebarToggle, toggleButton } from './domAdditions'
import { removeSelection } from './highlight'

$(document).ready(function() {
	chrome.storage.local.get('selectedText', (selectedText) => console.log("HERE IS THE SELECTED TEXT:",selectedText))
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
	chrome.storage.local.set({ 'currentUser': currentUser })
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
  $('#commentSubmission').focus()
}

function appendFormSubmission() {
	$('#formSubmission').submit(function(evt) {
		evt.preventDefault()
		secureCommentContext()
		removeSelection()
	})
}

function secureCommentContext() {
	const commentText = $('#commentSubmission').val()
	chrome.storage.local.get(
		['currentUser', 'currentArticle', 'selectedText', 'selectType'],
			({ currentUser, currentArticle, selectedText, selectType}) => {
				// console.log("selected text:", selectedText)
				// console.log("includes &nbsp", selectedText.includes('&nbsp'))
				// console.log("includes nbsp", selectedText.includes('nbsp'))
				// console.log("did we remove nbsp?", selectedText.replace(/&nbsp;/g, ' '))
				// const new = selectedText.replace(/&nbsp;/g, ' ')
				// console.log("new string", new)


			let domElText = null
			if (selectedText) {
				domElText = selectedText.includes(`&nbsp`)
					? selectedText.slice(0,selectedText.indexOf(`&nbsp`))
					: selectedText
			}


					// ? selectedText.replace(/&nbsp;/g, ' ')

			// let domElText = null
			// if (selectedText) {
			// 	domElText = selectedText.includes('&nbsp')
			// 		? selectedText.replace(/&nbsp;/g, ' ')
			// 		: selectedText
			// }

			// const domElement = selectedText
			// 	? selectedText.includes('&nbsp')
			// 		? selectedText.slice('&bnsp')[0]
			// 		: selectedText
			// 	: null
			// const domElement = selectedText.includes('&nbsp')
			// 	? selectedText.slice('&bnsp')
			// 	: selectedText
			const paragraphId = (selectedText === null)
				? null
				: paragraphMatch(currentArticle.paragraphs, selectedText)
			postAndDisplayComment(
				currentUser, commentText, currentArticle.id,
				paragraphId, domElText, selectType)
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

function postAndDisplayComment(
	user, text, article_id, paragraph_id, domElText, domElType) {
	// const paragraph_id = paragraph ? paragraph.id : null
	// const paragraphText = paragraph ? paragraph.text : null
	postComment({
		article_id,
		paragraph_id,
		text,
		user_id: user.id,
		domElText,
		domElType
	})
		.then(newComment => {
			// const storageId = String(newComment.id)
			// const storedParagraph = { storageId : paragraphText }
			// console.log("here is the comment id", storageId)
			// chrome.storage.local.set({ 'storedParagraphs': storedParagraph })
			// chrome.storage.local.get('storedParagraphs', (ret) => console.log("return here", ret))
			commentDisplay(user.name, newComment)
			$('#commentSubmission').val('')
			// const commentHTML = commentDisplay(user.name, newComment)
			// Promise.resolve($('.contentHere').append($(`${commentHTML}`)))
			// 	.then(() => {
			// 		$('#commentSubmission').val('')
			// 		addHoverHandler()
			// 	})
		})
}

function storeCurrentUser(currentUser) {
	chrome.storage.local.set({ 'currentUser': currentUser })
}



			// Promise.resolve(commentDisplay(user.name, newComment))
			// 	.then(commentHTML => {
			// 		$('.contentHere').append($(`${commentHTML}`))
			// 		$('#commentSubmission').val('')
			// 		addHoverHandler()

			// const commentHTML = commentDisplay(user.name, newComment)
			// $('.contentHere').append($(`${commentHTML}`))
			// $('#commentSubmission').val('')

			// function clickHandler() {
// 	$('.annotate-sidebar').on('click', evt => {
// 		console.log("event target", evt.target)
// 		// console.log("LOOKY HERE:", evt)
// 	})
// }

