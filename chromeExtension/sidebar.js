import axios from 'axios'
import stringSimilarity from 'string-similarity'

const sidebar =
	`<div class='annotate-sidebar' style='display: none'>
		<nav class="panel">
		<p id="userInfo">Not Logged In</p>
		<button id="signin">sign in</button>
		<button id="signout">sign out</button>
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
	</div>`

const style =
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`

var sidebarToggle = `<div class='annotate-toggle far-right'>X</div>`

function createComment(comment){
	console.log('reached createcomment', comment)
	axios.post(`http://localhost:1337/api/comments`, comment)
		.catch("Comment was NOT successfully added to db")
}

$(document).ready(function() {
	// Add the sidebar to the page
	$('head').append(style)
	$('body').append(sidebar)
	// Add the Toggle (Hide) Button to the page
	$('body').append(sidebarToggle)
	// Toggle sidebar

	//Sign in/out
	$('#signin').click(function() {
		console.log("sigin clicked")
		chrome.runtime.sendMessage(
    	"signin",
			async function (response){
			await	response ? $('#userInfo').text(response.displayName) : null
			}
  	)
	})

		$('#signout').click(function() {
		console.log("signout clicked")
		chrome.runtime.sendMessage(
    	"signout",
			function (response){
				userInfo = "User Signed Out"
				console.log(userInfo, "usrInfo")
				$('#userInfo').text(userInfo)
			}
  	)
	})

	$('.annotate-toggle').click(function() {
		$('.annotate-sidebar').toggle()
		$('.annotate-toggle').toggleClass('far-right')

		if ($('.annotate-toggle').text() === "X") {
			$('.annotate-toggle').text("<")
		} else {
			$('.annotate-toggle').text("X")
		}
	})

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
		$('.annotate-text-entry').val("")
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

})

// submitForm function
	// let submitForm = function(evt) {
	// 	evt.preventDefault()
	// 	console.log("Clicked on Save Button")
	// 	const comment = $('.annotate-text-entry').val()
	// 	const commentHTML = `
	// 	<a class="panel-block is-active">
	// 		<span class="panel-icon">
	// 			<i class="fa fa-book"></i>
	// 		</span>
	// 		${comment}
	// 	</a>`
	// 	$('.annotate-list').append($(`${commentHTML}`))
	// 	$('.annotate-text-entry').val("")
	// }

// keypress trial
	// When the save button is clicked, save the text as a note
	// $('.annotate-save').keypress(function (key) {
	// 	if (key.which === 13) {
	// 		console.log("Clicked on Save Button")
	// 		const comment = $('.annotate-text-entry').val()
	// 		const commentHTML = `
	// 		<a class="panel-block is-active">
	// 			<span class="panel-icon">
	// 				<i class="fa fa-book"></i>
	// 			</span>
	// 			${comment}
	// 		</a>`
	// 		$('.annotate-list').append($(`${commentHTML}`))
	// 		$('.annotate-text-entry').val("")
	// 	}
	// })
	// $('.annotate-save').click(submitForm())

	// OLD VERSION
	// $('.annotate-save').click(function() {
	// 	console.log("Clicked on Save Button")
	// 	const comment = $('.annotate-text-entry').val()
	// 	const commentHTML = `
	// 	<a class="panel-block is-active">
	// 		<span class="panel-icon">
	// 			<i class="fa fa-book"></i>
	// 		</span>
	// 		${comment}
	// 	</a>`
	// 	$('.annotate-list').append($(`${commentHTML}`))
	// 	$('.annotate-text-entry').val("")
	// })


/* saving / rendering notes */

// 	// Load the notes that have been saved for the current page, and then render them in the sidebar.
// 	// getNotes(renderNotes)
// })

// var saveNotes = function(list) {
// 	var save = {}
// 	save[getCurrentPage()] = list
// 	chrome.storage.sync.set(save, function(){})
// }

// // Given the `text` of a new note (after Save was clicked), save it to the list.
// var saveNote = function(text) {
// 		console.log("saveNote... here")
// }


/* Darryn's Version */

// // on document ready, load button
// $(document).ready(function() {

// 	$('body').append(sidebarToggle)

// 	// Add the Toggle (Hide) Button to the page
// 	// When the toggle button is clicked, hide the sidebar. Toggle the text shown.

// 	$('.annotate-toggle').click(function() {

// 		$('.annotate-toggle').toggleClass('far-right')

// 		if ($('.annotate-toggle').text() == "X") {
// 			$('.annotate-sidebar').toggle()
// 			$('.annotate-toggle').text("<")
// 		} else {
// 			$('body').append(sidebar)
// 			$('.annotate-toggle').text("X")
// 		}
// 	})
// })

			// <form onsubmit=${(() => submitForm())}>
