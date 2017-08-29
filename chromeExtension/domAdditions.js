
export const style =
	`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`
export function appendSidebar(name) {
	console.log("in domAdditions - appendSidebar")
	const sidebar =
	`
	<div class='scroll annotate-sidebar' style='display: none'>
		<nav class="panel">
			<p class="panel-heading annotate-header">
				<strong>Comments</strong>
			</p>
		</nav>

		<article class='contentHere'></article>

		<article class='media'>
			<figure class='media-left'>
				<p class='image is-48x48 leftBuffer'>
					<img src='http://bulma.io/images/placeholders/128x128.png'>
				</p>
			</figure>
			<div class='media-content'>
				<form id='formSubmission'>
					<div class='field'>
						<p class='control rightBuffer'>
							<textarea
							id='commentSubmission'
								class='textarea is-size-7'
								placeholder='${name}, what do you think?'
						></textarea>
						</p>
					</div>
					<div class='field'>
						<p class='control rightBuffer'>
							<input type=submit class='button is-size-7'>
						</p>
					</div>
				</form>
			</div>
		</article>
	</div>
	`
	$('body').append(sidebar)

	// closes to working...
	// $('.annotate-sidebar').on({
	// 	mouseenter: (evt) => {
	// 		const node = parentTraversal(evt)
	// 		$(node).addClass('hoverHighlight')
	// 		console.log("entering", node)
	// 	},
	// 	mouseleave: (evt) => {
	// 		const node = parentTraversal(evt)
	// 		if ($(node).attr('class') &&
	// 			$(node).attr('class').includes('hoverHighlight')) {
	// 			$(node).removeClass('hoverHighlight')
	// 		}
	// 		console.log("exit", node)
	// 	}
	// })

}

// function parentTraversal(evt) {
// 	let node = evt.target
// 	while ($(node).attr('class') &&
// 		!$(node).attr('class').includes('indComment')) {
// 		node = node.parentNode
// 	}
// 	return node
// }

// ADD SELECTOR HEREEEEEEE

	// $('.annotate-sidebar').on('mouseenter', '.indComment', (evt) => {
	// 	const node = parentTraversal(evt)
	// 	$(node).addClass('hoverHighlight')
	// 	console.log("should be indComment class node", node)
	// })
	// $('.annotate-sidebar').on('mouseenter', '.indComment', (evt) => {
	// 	const node = parentTraversal(evt)
	// 	$(node).addClass('hoverHighlight')
	// 	console.log("should be indComment class node", node)
	// })


		// <article class='contentHere'></article>






			// <form id='formSubmission'>
			// 	<input type=submit class='annotate-save' value='Comment'>
			// 	<input class='annotate-text-entry' placeholder='${name}, what do you think?'>
			// </form>

// export function appendSidebar(name) {
// const sidebar =
// `
// <div class='scroll annotate-sidebar' style='display: none'>

// 	<nav class="panel">
// 		<p class="panel-heading annotate-header">Comments</p>
// 	<nav>

// <article class='media'>
//   <figure class='media-left'>
//     <p class='image is-48x48 leftBuffer'>
//       <img src='http://bulma.io/images/placeholders/128x128.png'>
//     </p>
//   </figure>
//   <div class='media-content'>
//     <div class='content'>
//       <p class='is-size-7 rightBuffer'>
//         <strong>Barbara Middleton</strong>
//         <br>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
//         <br>
//         <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
//       </p>
//     </div>

//     <article class='media'>
//       <figure class='media-left'>
//         <p class='image is-32x32'>
//           <img src='http://bulma.io/images/placeholders/96x96.png'>
//         </p>
//       </figure>
//       <div class='media-content'>
//         <div class='content'>
//           <p class='is-size-7'>
//             <strong>Sean Brown</strong>
//             <br>
//             Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
//             <br>
//             <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
//           </p>
//         </div>

//         <article class='media is-size-7'>
//           Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu lorem cursus ullamcorper sit amet nec massa.
//         </article>

//         <article class='media is-size-7'>
//           Morbi vitae diam et purus tincidunt porttitor vel vitae augue. Praesent malesuada metus sed pharetra euismod. Cras tellus odio, tincidunt iaculis diam non, porta aliquet tortor.
//         </article>
//       </div>
//     </article>

//     <article class='media'>
//       <figure class='media-left'>
//         <p class='image is-32x32'>
//           <img src='http://bulma.io/images/placeholders/96x96.png'>
//         </p>
//       </figure>
//       <div class='media-content'>
//         <div class='content'>
//           <p class='is-size-7'>
//             <strong>Kayli Eunice </strong>
//             <br>
//             Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas varius felis sit amet magna vestibulum euismod malesuada cursus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lacinia non nisl id feugiat.
//             <br>
//             <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
//           </p>
//         </div>
//       </div>
//     </article>
//   </div>
// </article>
// <article class='media'>
//   <figure class='media-left'>
//     <p class='image is-48x48'>
//       <img src='http://bulma.io/images/placeholders/128x128.png'>
//     </p>
//   </figure>
//   <div class='media-content'>
//     <div class='field'>
//       <p class='control'>
//         <textarea class='textarea is-size-7' placeholder='Add a comment...'></textarea>
//       </p>
//     </div>
//     <div class='field'>
//       <p class='control'>
//         <button class='button is-size-7'>Post comment</button>
//       </p>
//     </div>
//   </div>
// </article>
// </div>
// `
// $('body').append(sidebar)
// }



export const sidebarToggle = '<div class="annotate-toggle far-right "></div>'
export const toggleButton =
	`
	<a
    class='button iconText is-dark is-medium is-focused'>
    <i class='fa fa-globe'></i>20-20
	</a>
`
