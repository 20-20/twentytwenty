
import axios from 'axios'
import { extensionToggle } from './sidebar'

$(() => {
  $('html').dblclick(() => {
    selectionTextAndHighlight()
  })
})

// DETERMINE WHETHER TO KEEP ARGS OR NOT
export default function selectionTextAndHighlight(chrExt=true) {
  let text = ''
  if (window.getSelection) {
    text = window.getSelection().toString() // string generation
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text
  }
  const parentEl = window.getSelection().anchorNode.parentElement
  toggleSelectionAndHighlight(parentEl, chrExt)
}

function toggleSelectionAndHighlight(parentEl, chrExt) {
  if ($(parentEl).attr('class')
    && $(parentEl).attr('class').includes('twentyHighlight')) {
      $(parentEl).removeClass('twentyHighlight')
      if (chrExt) {
        if (!$('.iconText').text()) extensionToggle()
        chrome.storage.local.set({ 'selectedText': null})
        chrome.storage.local.set({ 'selectType': null })
      }
    } else {
      $(parentEl).addClass('twentyHighlight')
      // focus user cursor on comment text box
      $('#commentSubmission').focus()
      if (chrExt) {
        if ($('.iconText').text().length) extensionToggle()
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
