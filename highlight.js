
$(() => {
  $('html').dblclick(() => {
    getSelectionText()
    showExt()
  })
})

function getSelectionText() {
  let text = "";
  if (window.getSelection) {
      text = window.getSelection().toString(); // string generation
  } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
  }
  // let clickCount = {}
  let parentEl = window.getSelection().anchorNode.parentElement
  $(parentEl).attr('class').includes('twentyHighlight')
    ? $(parentEl).removeClass('twentyHighlight')
    : $(parentEl).addClass('twentyHighlight')
}

function showExt() {
  // if style.cssText exists (is diplay: none), toggle sidebar
  if ($('.annotate-sidebar')[0].style.cssText) {
		$('.annotate-sidebar').toggle();
		$('.annotate-toggle').toggleClass('far-right');

		if ($('.annotate-toggle').text() === "X") {
			$('.annotate-toggle').text("<")
		} else {
			$('.annotate-toggle').text("X")
		}
  }

  // focus user input into comment text box
  $('.annotate-text-entry').focus()
}


