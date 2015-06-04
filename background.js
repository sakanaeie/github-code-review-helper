chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if ('complete' === changeInfo.status && -1 !== tab.url.search(/^https?:\/\/github.com\//)) {
		chrome.pageAction.show(tabId);
	}
});

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {"file": "exec.js"});
});
