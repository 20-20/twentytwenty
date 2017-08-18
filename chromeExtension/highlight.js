
import axios from 'axios'

$(() => {
  $('html').dblclick(() => {
    getSelectionText()
    // loadArticleData()
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
  const parentEl = window.getSelection().anchorNode.parentElement
  if ($(parentEl).attr('class')) {
    $(parentEl).attr('class').includes('twentyHighlight')
      ? $(parentEl).removeClass('twentyHighlight')
      : $(parentEl).addClass('twentyHighlight')
  } else { $(parentEl).addClass('twentyHighlight') }
  const storageObj = { selectedText: parentEl.innerHTML }
  chrome.storage.local.set(storageObj)
}

// function loadArticleData() {
//   console.log("document url", document.URL)
//   // axios.post('/api/singleArticle/')
// }


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

  // extends: "eslint-config-standard",

