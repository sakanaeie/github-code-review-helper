(function() {
  var displayLGTM = function() {
    var div = $('#lgtm-list');

    // 既存の画像を削除する
    div.empty();

    // LGTM画像を取得し、タグを生成する
    var count = 0;
    for (var i = 0; i < 3; i++) {
      // くるくるを表示させる
      $('#lgtm-refresh-animate').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');

      // 画像タグの生成器を作成する
      var imgGen = function(lgtm_json) {
        return $('<img>').attr('class', 'lgtm-img img-thumbnail').attr('src', lgtm_json.imageUrl).click(function() {
          // クリックしたとき、アクティブなタブにメッセージを送信する
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {process: 'lgtm', markdown: '![LGTM](' + lgtm_json.imageUrl + ')'}, function(response) {});
          });
        }).load(function() {
          // ロード完了したとき
          if (3 <= ++count) {
            // くるくるを消す
            $('#lgtm-refresh-animate').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
          }
        });
      };

      // ajax
      $.getJSON('http://www.lgtm.in/g', function(json) {
        div.append($('<hr>'));
        div.append(imgGen(json));
      });
    }
  };

  $(window).load(function () {
    // リロードボタンにバインドする
    $('#lgtm-reload').click(displayLGTM);

    // 一度実行する
    displayLGTM();
  });
})();
