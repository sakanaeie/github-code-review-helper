chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (-1 === tab.url.search(/^https?:\/\/github.com\//)) {
    return;
  }

  if ('complete' === changeInfo.status) {
    chrome.pageAction.show(tabId);
  }

  chrome.tabs.executeScript(tabId, {'file': 'onupdated.js'});
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {'file': 'exec.js'});
});
