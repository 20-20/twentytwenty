 const sidebar =
	`<div class='annotate-sidebar'>
		<nav class="bulmapanel">
			<p class="bulmapanel-heading annotate-header">
				Comments
			</p>
			<div class='annotate-list'>
			</div>
			<input type=submit class='annotate-save' value='Save'>
			<input class='annotate-text-entry' placeholder='Type notes here!'>
		</nav>
	</div>`;

var sidebarToggle = `<div class='annotate-toggle far-right'><</div>`;

// on document ready, load button
$(document).ready(function() {

	$('body').append(sidebarToggle);

	// Add the Toggle (Hide) Button to the page
	// When the toggle button is clicked, hide the sidebar. Toggle the text shown.

	$('.annotate-toggle').click(function() {

		$('.annotate-toggle').toggleClass('far-right');

		if ($('.annotate-toggle').text() == "X") {
			$('.annotate-sidebar').toggle();
			$('.annotate-toggle').text("<")
		} else {
			$('body').append(sidebar);
			$('.annotate-toggle').text("X")
		}
	});
})


let reveal = function() {
	// Add the sidebar to the page
	$('body').append(sidebar);
	// Add the Toggle (Hide) Button to the page
	$('body').append(sidebarToggle);
	// When the toggle button is clicked, hide the sidebar. Toggle the text shown.
	$('.annotate-toggle').click(function() {
		$('.annotate-sidebar').toggle();
		$('.annotate-toggle').toggleClass('far-right');

		if ($('.annotate-toggle').text() == "X") {
			$('.annotate-toggle').text("<")
		} else {
			$('.annotate-toggle').text("X")
		}
	});

	// When the save button is clicked, save the text as a note
	$('.annotate-save').click(function() {
		console.log("Clicked on Save Button");
		const comment = $('.annotate-text-entry').val();
		const commentHTML = `
		<a class="panel-block is-active">
			<span class="panel-icon">
				<i class="fa fa-book"></i>
			</span>
			${comment}
		</a>`
		$('.annotate-list').append($(`${commentHTML}`));
		$('.annotate-text-entry').val("");

	});

}











// $(document).ready(function() {

// 	// Add the sidebar to the page

// 	$('body').append(sidebar);

// 	// Add the Toggle (Hide) Button to the page
// 	$('body').append(sidebarToggle);

// 	// When the toggle button is clicked, hide the sidebar. Toggle the text shown.
// 	$('.annotate-toggle').click(function() {
// 		$('.annotate-sidebar').toggle();
// 		$('.annotate-toggle').toggleClass('far-right');

// 		if ($('.annotate-toggle').text() == "X") {
// 			$('.annotate-toggle').text("<")
// 		} else {
// 			$('.annotate-toggle').text("X")
// 		}



// 	});

// 	// When the save button is clicked, save the text as a note
// 	$('.annotate-save').click(function() {
// 		console.log("Clicked on Save Button");

// 		const comment = $('.annotate-text-entry').val();
// 		const commentHTML = `
// 		<a class="panel-block is-active">
// 			<span class="panel-icon">
// 				<i class="fa fa-book"></i>
// 			</span>
// 			${comment}
// 		</a>`
// 		$('.annotate-list').append($(`${commentHTML}`));
// 		$('.annotate-text-entry').val("");

// 		getSelectionText()

// 		// saveNote($('.annotate-text-entry').val(), function() {
// 		// 	console.log("HERE");
// 		// });
// 	});

// 	// Load the notes that have been saved for the current page, and then render them in the sidebar.
// 	// getNotes(renderNotes);
// });


// var saveNotes = function(list) {
// 	var save = {};
// 	save[getCurrentPage()] = list;
// 	chrome.storage.sync.set(save, function(){});
// };

// // Given the `text` of a new note (after Save was clicked), save it to the list.
// var saveNote = function(text) {
// 		console.log("saveNote... here");
// };


