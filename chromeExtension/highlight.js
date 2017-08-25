
import axios from 'axios'
import { extensionToggle } from './sidebar'

$(() => {
  $('html').dblclick(() => {
    getSelectionTextAndHighlight()
    // extensionToggle()
    // if ($('.iconText').text().length) extensionToggle()
  })
})

export function getSelectionTextAndHighlight() {
  console.log("highlight.js hit!")
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString() // string generation
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  // let clickCount = {}
  const parentEl = window.getSelection().anchorNode.parentElement
  if ($(parentEl).attr('class')
    && $(parentEl).attr('class').includes('twentyHighlight')) {
      if (!$('.iconText').text()) extensionToggle()
      $(parentEl).removeClass('twentyHighlight')
      chrome.storage.local.set({ 'selectedText': null})
      chrome.storage.local.get('selectedText', (selectedText) => console.log("empty???", selectedText))
    } else {
      if ($('.iconText').text().length) extensionToggle()
      $(parentEl).addClass('twentyHighlight')
      const storageObj = { 'selectedText': parentEl.innerHTML }
      chrome.storage.local.set({ 'selectedText': parentEl.innerHTML})
      chrome.storage.local.get('selectedText', (selectedText) => console.log("full???", selectedText))
  }
}

// function showExt() {
//   // if style.cssText exists (is diplay: none), toggle sidebar
//   if ($('.annotate-sidebar')[0].style.cssText) {
//     $('.annotate-sidebar').toggle()
//     $('.annotate-toggle').toggleClass('far-right')

//     if ($('.annotate-toggle').text() === 'X') {
//       $('.annotate-toggle').text('<')
//     } else {
//       $('.annotate-toggle').text('X')
//     }
//   }

//   // focus user input into comment text box
//   $('.annotate-text-entry').focus()
// }
