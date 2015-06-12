chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (-1 === tab.url.search(/^https?:\/\/github.com\//)) {
    return;
  }

  chrome.pageAction.show(tabId);

  chrome.tabs.executeScript(tabId, {'file': 'tab_converter.js'});
  chrome.tabs.executeScript(tabId, {'file': 'onupdated.js'});
});
