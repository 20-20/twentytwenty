function hello() {
  chrome.tabs.executeScript({
    file: 'bundle.js'
  })
}

document.getElementById('clickme').addEventListener('click', hello)
