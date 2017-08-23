
export const style =
	`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`
export function appendSidebar(name) {
	const sidebar =
	`
	<div class='annotate-sidebar' style='display: none'>
		<nav class="panel">
			<p class="panel-heading annotate-header">
				Comments
			</p>
			<div class='annotate-list'></div>
			<form id='formSubmission'>
				<input type=submit class='annotate-save' value='Comment'>
				<input class='annotate-text-entry' placeholder='${name}, what do you think?'>
			</form>
		</nav>
	</div>
	`
	$('body').append(sidebar)
}
export const sidebarToggle = '<div class="annotate-toggle far-right "></div>'
export const toggleButton =
	`
	<a
    class='button iconText is-dark is-medium is-focused'>
    <i class='fa fa-globe'></i>20-20
	</a>
`
