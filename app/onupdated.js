// tab文字変換ボタンを生成する
(function() {
  var div_id         = 'GithubCodeReviewHelper-tab-transfer-div';
  var button_id_soft = 'GithubCodeReviewHelper-tab-transfer-soft-button';
  var button_id_hard = 'GithubCodeReviewHelper-tab-transfer-hard-button';

  if (0 === $('#' + div_id).length) {
    // Softボタンを生成する
    var button_soft = $('<button>').attr('id', button_id_soft).attr('class', 'btn btn-sm').html('Soft').click(function() {
      var converter = new TabConverter();
      converter.execSoft();
    });

    // Hardボタンを生成する
    var button_hard = $('<button>').attr('id', button_id_hard).attr('class', 'btn btn-sm').html('Hard').click(function() {
      var converter = new TabConverter();
      converter.execHard();
    });

    // ボタンを配置する
    $('#js-repo-pjax-container').prepend(
      $('<div>').attr('id', div_id).attr('class', 'container commit-tease').html('GithubCodeReviewHelper tab transfer :').append(
        button_soft,
        button_hard
      ),
      $('<hr>')
    );
  }
})();

// PageTopボタンを生成する
(function() {
  var button_id = 'GithubCodeReviewHelper-page-top-button';

  if (0 === $('#' + button_id).length) {
    $('#js-repo-pjax-container').append(
      $('<div>').attr('class', 'container').append(
        $('<button>').attr('id', button_id).attr('class', 'btn btn-sm').html('Page top').click(function() {
          $('html,body').animate({scrollTop: 0}, 400, 'swing');
        })
      )
    );
  }
})();

// LGTM画像をリサイズする
(function() {
  $('img').each(function() {
    if ('LGTM' === $(this).attr('alt')) {
      $(this).css('height', '200px');
    }
  });
})();

// botの発言を非表示にする
(function() {
  $('.timeline-comment-wrapper').each(function() {
    var author = $(this).find('.author');
    if (0 !== author.length) {
      var name = $(author[0]).html();
      if (-1 !== name.indexOf('jenkinsbot') || -1 !== name.search(/-bot$/)) {
        $(this).remove();
      }
    }
  });
})();
