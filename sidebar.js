let sidebar = `<div class='annotate-sidebar' style='display: none'>
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
	</div>`;

var sidebarToggle = `<div class='annotate-toggle far-right'>X</div>`


$(document).ready(function() {

let userInfo
	// Add the sidebar to the page
	$('body').append(sidebar);
	// Add the Toggle (Hide) Button to the page

	$('body').append(sidebarToggle);
	// Toggle sidebar

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
		$('.annotate-sidebar').toggle();
		$('.annotate-toggle').toggleClass('far-right');

		if ($('.annotate-toggle').text() === "X") {
			$('.annotate-toggle').text("<")
		} else {
			$('.annotate-toggle').text("X")
		}
	})

	$('#formSubmission').submit(function(evt) {
		evt.preventDefault()
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
})



