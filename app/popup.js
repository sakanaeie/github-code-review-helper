var displayLGTM = function() {
  var div = $('#lgtm-list');

  // 既存の画像を削除する
  div.empty();

  // LGTM画像を取得し、タグを生成する
  var count = 0;
  for (var i = 0; i < 3; i++) {
    $('#lgtm-refresh-animate').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');

    $.getJSON('http://www.lgtm.in/g', function(json) {
      div.append($('<hr>'));
      div.append($('<input>').attr('class', 'lgtm-url').val('![LGTM](' + json.imageUrl + ')'));
      div.append($('<img>').attr('class', 'lgtm-img').attr('src', json.imageUrl).load(function() {
        if (3 <= ++count) {
          $('#lgtm-refresh-animate').removeClass('glyphicon glyphicon-refresh glyphicon-refresh-animate');
        }
      }));
    });
  }
};

$(window).load(function () {
  // リロードボタンにバインドする
  $('#lgtm-reload').click(displayLGTM);

  // 一度実行する
  displayLGTM();
});
