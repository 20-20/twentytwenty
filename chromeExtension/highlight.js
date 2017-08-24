
import axios from 'axios'
import { extensionToggle } from './sidebar'

$(() => {
  $('html').dblclick(() => {
    selectionTextAndHighlight()
    // extensionToggle()
    // if ($('.iconText').text().length) extensionToggle()
  })
})

function selectionTextAndHighlight() {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString() // string generation
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  // let clickCount = {}
  const parentEl = window.getSelection().anchorNode.parentElement
  toggleSelectionAndHighlight(parentEl)
}

export function toggleSelectionAndHighlight(parentEl) {
  console.log("parentEl", parentEl)
  if ($(parentEl).attr('class')
    && $(parentEl).attr('class').includes('twentyHighlight')) {
      console.log("entered highlight removal")
      if (!$('.iconText').text()) extensionToggle()
      $(parentEl).removeClass('twentyHighlight')
      chrome.storage.local.set({ 'selectedText': null})
      // chrome.storage.local.set({ 'selectionParentEl': null})
      chrome.storage.local.get('selectedText', (selectedText) => console.log("empty???", selectedText))
    } else {
      console.log("entered highlight addition")
      if ($('.iconText').text().length) extensionToggle()
      $(parentEl).addClass('twentyHighlight')
      const storageObj = { 'selectedText': parentEl.innerHTML }
      chrome.storage.local.set({ 'selectedText': parentEl.innerHTML})
      // chrome.storage.local.set({ 'selectionParentEl': parentEl})
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
