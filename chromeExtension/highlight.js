
import axios from 'axios'
import { extensionToggle } from './sidebar'

$(() => {
  $('html').dblclick(() => {
    selectionTextAndHighlight()
    // extensionToggle()
    // if ($('.iconText').text().length) extensionToggle()
  })
})

export default function selectionTextAndHighlight(args) {
  const chrExt = args ? args : true
  console.log("entered, should be false", chrExt)
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

function toggleSelectionAndHighlight(parentEl) {
  console.log("parentEl", parentEl)
  if ($(parentEl).attr('class')
    && $(parentEl).attr('class').includes('twentyHighlight')) {
      console.log("entered highlight removal")
      console.log("here is the parent el", parentEl)
      $(parentEl).removeClass('twentyHighlight')
      if (chrExt) {
        if (!$('.iconText').text()) extensionToggle()
        chrome.storage.local.set({ 'selectedText': null})
        chrome.storage.local.set({ 'selectType': null })
      }
    } else {
      console.log("entered highlight addition")
      $(parentEl).addClass('twentyHighlight')
      // focus user cursor on comment text box
      $('#commentSubmission').focus()
      if (chrExt) {
        if ($('.iconText').text().length) extensionToggle()
        // const storageObj = { 'selectedText': parentEl.innerHTML }
        chrome.storage.local.set({
          'selectType': $(parentEl).prop('nodeName')
        })
        chrome.storage.local.set({ 'selectedText': parentEl.innerHTML})
      }
  }
}

export function removeSelection() {
  $('.twentyHighlight').removeClass('twentyHighlight')
  chrome.storage.local.set({ 'selectedText': null})
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
