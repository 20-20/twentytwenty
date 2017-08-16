
$(() => {
  $('html').dblclick(() => getSelectionText())
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
  console.log("new parent element:", parentEl)
}
