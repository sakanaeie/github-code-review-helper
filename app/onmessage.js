chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if ('lgmt' === request.process) {
    $('#new_comment_field').val($('#new_comment_field').val() + request.markdown);
  }
});
