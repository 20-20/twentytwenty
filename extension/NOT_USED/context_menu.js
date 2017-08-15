// Create an item in the menu that functions as a checkbox
var checkbox = chrome.contextMenus.create(
	{"title": "Find and Mark", "type": "checkbox", "onclick":checkboxOnClick});

function checkboxOnClick(info, tab) {
  console.log(JSON.stringify(info));
  // Send a message to the tabs indicating whether the checkbox is enabled or disabled, which
  // is stored in `markWords` (whether we should mark or unmark the words).
  // info.checked will be true if in clicking on the item in the menu you checked the option
  chrome.tabs.query({
      "active": true,
      "currentWindow": true
  }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
          "markWords": info.checked
      });
  });

}