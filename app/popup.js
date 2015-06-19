var displayLGTM = function() {
  var div = $('#lgtm-list');

  // 既存の画像を削除する
  div.empty();

  // LGTM画像を取得し、タグを生成する
  var count = 0;
  for (var i = 0; i < 3; i++) {
    $('#lgtm-refresh-animate').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');

    $.getJSON('http://www.lgtm.in/g', function(json) {
      var md = '![LGTM](' + json.imageUrl + ')';
      div.append($('<hr>'));
      div.append($('<input>').attr('class', 'lgtm-url form-control').val(md));
      div.append($('<img>').attr('class', 'lgtm-img img-thumbnail').attr('src', json.imageUrl)
        .click(function() {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {process: 'lgtm', markdown: md}, function(response) {});
          });
        })
        .load(function() {
          if (3 <= ++count) {
            $('#lgtm-refresh-animate').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
          }
        })
      );
    });
  }
};

$(window).load(function () {
  // リロードボタンにバインドする
  $('#lgtm-reload').click(displayLGTM);

  // 一度実行する
  displayLGTM();
});
