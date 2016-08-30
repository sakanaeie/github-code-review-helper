chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if ('showtab' === request.process) {
    new TabConverter().execHard();
  }

  if ('lgtm' === request.process) {
    $('#new_comment_field').val($('#new_comment_field').val() + request.markdown);
  }
});
