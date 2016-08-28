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

      // ajax
      $.getJSON('http://www.lgtm.in/g', function(json) {
        var md = '![LGTM](' + json.imageUrl + ')';

        // 画像を配置する
        div.append(
          $('<hr>'),
          $('<div>').append(
            $('<img>').attr('class', 'lgtm-img img-thumbnail').attr('src', json.imageUrl).click(function() {
              // アクティブなタブにメッセージを送信する
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {process: 'lgtm', markdown: md}, function(response) {});
              });

              // クリップボードにコピーする
              var input = $('<input>').val(md);
              $('body').append(input);
              input.select();
              var copied = document.execCommand('copy');
              input.remove();

              var flash = $('<div>').attr('class', 'text-primary').css('margin-left', '4px').html(copied ? '↓ Copied to clipboard' : 'Failed copy to clipboard');
              $(this).parent().prepend(flash);
              setTimeout(function() {
                flash.hide('slow', function() {
                  $(this).remove();
                });
              }, 3000);
            }).load(function() {
              if (3 <= ++count) {
                // くるくるを消す
                $('#lgtm-refresh-animate').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
              }
            })
          )
        );
      });
    }
  };

  $(window).load(function () {
    // tab文字変換ボタンにバインドする
    $('#show-tab').click(function() {
      $('#show-tab-animate').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');

      // アクティブなタブにメッセージを送信する
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {process: 'showtab'}, function(response) {
          $('#show-tab-animate').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
        });
      });
    });

    // リロードボタンにバインドする
    $('#lgtm-reload').click(displayLGTM);

    // 一度実行する
    displayLGTM();
  });
})();
