import axios from 'axios'
import stringSimilarity from 'string-similarity'
import renderLoginPrompt from './loginPrompt'
import renderComments, { postComment, commentDisplay, addHoverHandler } from './comments'
import { style, appendSidebar, sidebarToggle, toggleButton } from './domAdditions'
import { removeSelection } from './highlight'

$(document).ready(function() {
  axios.get(`http://localhost:1337/api/auth/whoami`)
    .then(res => {
      res.data
        ? renderChrExt(res.data)
        : renderLoginPrompt()
    })
})

function checkLogin() {
  axios.get(`http://localhost:1337/api/auth/whoami`)
    .then(res => res.data)
    .catch(err => console.error('Problem fetching current user', err))
}

function renderChrExt(currentUser) {
  storeCurrentUser(currentUser)
  renderComments()
  showButton(currentUser.name)
  appendFormSubmission()
}

function storeCurrentUser(currentUser) {
  chrome.storage.local.set({ 'currentUser': currentUser })
}

export function showButton(name) {
  // Add the sidebar to the page
  $('head').append(style)
  appendSidebar(name)
  $('body').append(sidebarToggle)
  $('.annotate-toggle').append(toggleButton)
  $('.annotate-toggle').click(extensionToggle)
}

export function extensionToggle() {
  $('.annotate-sidebar').toggle()
  $('.annotate-toggle').toggleClass('far-right')
  if ($('.iconText').text().length) {
    $('.iconText').text('')
    $('.iconText').append(`<i class='fa fa-globe'></i>`)
  } else $('.iconText').append(`20-20`)
  // focus user input into comment text box
  $('#commentSubmission').focus()
}

export function appendFormSubmission() {
  $('#formSubmission').submit(function(evt) {
    evt.preventDefault()
    secureCommentContext()
    removeSelection()
  })
}

export function secureCommentContext() {
  const commentText = $('#commentSubmission').val()
  chrome.storage.local.get(
    ['currentUser', 'currentArticle', 'selectedText', 'selectType'],
      ({ currentUser, currentArticle, selectedText, selectType}) => {
      let domElText = null
      if (selectedText) {
        domElText = selectedText.includes(`&nbsp`)
          ? selectedText.slice(0,selectedText.indexOf(`&nbsp`))
          : selectedText
      }
      const paragraphId = (selectedText === null)
        ? null
        : paragraphMatch(currentArticle.paragraphs, selectedText)
      postAndDisplayComment(
        currentUser, commentText, currentArticle.id,
        paragraphId, domElText, selectType)
      }
  )
}

export function paragraphMatch(paragraphs, selectedText) {
  const paragraphText = paragraphs.map(paragraph => paragraph.text)
  const { bestMatch } = stringSimilarity.findBestMatch(selectedText, paragraphText)
  const selectedParagraph = paragraphs.filter(
    (paragraph) => paragraph.text === bestMatch.target
  )
  return selectedParagraph[0].id
}

export function postAndDisplayComment(
  user, text, article_id, paragraph_id, domElText, domElType) {
  postComment({
    article_id,
    paragraph_id,
    text,
    user_id: user.id,
    domElText,
    domElType
  })
    .then(newComment => {
      commentDisplay(user.name, newComment)
      $('#commentSubmission').val('')
    })
}

function storeCurrentUser(currentUser) {
  chrome.storage.local.set({ 'currentUser': currentUser })
}
