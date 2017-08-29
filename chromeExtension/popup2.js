$(document).ready(function() {
  console.log("here")
  hello()
})

function hello() {
  chrome.tabs.executeScript({
    file: 'bundle.js'
  })
}
