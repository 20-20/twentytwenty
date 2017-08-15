// Listens for messages from the Context Menu
chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.markWords == true) {
    	// If we got a message and it said to mark words, we mark them. Else we
    	// unmark them.
        markWords(true);
    }
    else {
        markWords(false);
    }
});

// Uses jQuery to mark words on the page. the `mark` parameter indicates
// whether we are marking or unmarking the words on the page.
var markWords = function (mark) {
	// Add a <span> surrounding all instances of the word "chrome" on the page
	var strToReplace = "chrome"

	// CHALLENGE 1: What kinds of neat things can you replace the string with on the page?
	var targetHTML = '<span class="marked">'+strToReplace+'</span>';
	var newHTML;
	if (mark) {
		// To mark, replace instances of "chrome" that occur within <p> elements with
		// a surrounding span
		newHTML = $('p').html().replace(strToReplace, targetHTML);
	} else {
		// To unmark, replace instances where we have the <span> surrounding "chrome"
		// with just "chrome" as a string
		newHTML = $('p').html().replace(targetHTML, strToReplace);
	}
	// .html(newHTML) is needed to actually _set_ the new html
    $('p').html(newHTML);
}