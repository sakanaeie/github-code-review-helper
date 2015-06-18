chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (-1 === tab.url.search(/^https?:\/\/github.com\//)) {
    return;
  }

  if ('complete' === changeInfo.status) {
    chrome.tabs.executeScript(tabId, {'file': 'app/onupdated.js'});
  }
});
