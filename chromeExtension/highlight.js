
import axios from 'axios'
import { extensionToggle } from './sidebar'

$(() => {
  $('html').dblclick(() => {
    selectionTextAndHighlight()
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

function toggleSelectionAndHighlight(parentEl) {
  console.log("parentEl", parentEl)
  if ($(parentEl).attr('class')
    && $(parentEl).attr('class').includes('twentyHighlight')) {
      console.log("entered highlight removal")
      console.log("here is the parent el", parentEl)
      if (!$('.iconText').text()) extensionToggle()
      $(parentEl).removeClass('twentyHighlight')
      chrome.storage.local.set({ 'selectedText': null})
      chrome.storage.local.set({ 'selectType': null })
    } else {
      console.log("entered highlight addition")
      if ($('.iconText').text().length) extensionToggle()
      $(parentEl).addClass('twentyHighlight')
      // const storageObj = { 'selectedText': parentEl.innerHTML }
      chrome.storage.local.set({
        'selectType': $(parentEl).prop('nodeName')
      })
      chrome.storage.local.set({ 'selectedText': parentEl.innerHTML})
      // focus user cursor on comment text box
      $('#commentSubmission').focus()
  }
}

export function removeSelection() {
  $('.twentyHighlight').removeClass('twentyHighlight')
  chrome.storage.local.set({ 'selectedText': null})
}
