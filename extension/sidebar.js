
// set up the HTML of the toggle button (which closes the sidebar)
// var sidebarToggle = "<div class='annotate-toggle'>X</div>";

// set up the HTML for each of the notes that will be saved in the sidebar
var noteTemplate = "<div class='annotate-note'><div class='annotate-note-text'></div><div class='annotate-remove-note'>X</div></div>";

// These commands are executed right when the page loads
$(document).ready(function() {
	// Add the sidebar to the page
	console.log("document ready");

	// $('body').append(sidebar);

	// Add the Toggle (Hide) Button to the page
	// $('body').append(sidebarToggle);

	// When the toggle button is clicked, hide the sidebar. Toggle the text shown.
	$('.annotate-toggle').click(function() {
		$('.annotate-sidebar').toggle();
		$('.annotate-toggle').toggleClass('far-right');
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

		getSelectionText()


		// saveNote($('.annotate-text-entry').val(), function() {
		// 	console.log("HERE");
		// });
	});

	// Load the notes that have been saved for the current page, and then render them in the sidebar.
	getNotes(renderNotes);
});


var saveNotes = function(list) {
	var save = {};
	save[getCurrentPage()] = list;
	chrome.storage.sync.set(save, function(){});
};

// Given the `text` of a new note (after Save was clicked), save it to the list.
var saveNote = function(text) {
		console.log("saveNote... here");
};



