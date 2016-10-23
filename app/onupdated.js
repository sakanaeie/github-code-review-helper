// PageTopボタンを生成する
(function() {
  var button_id = 'GithubCodeReviewHelper-page-top-button';

  if (0 === $('#' + button_id).length) {
    $('#js-repo-pjax-container').append(
      $('<div>').addClass('container').append(
        $('<button>').attr('id', button_id).addClass('btn btn-sm').html('Page top').click(function() {
          $('html,body').animate({scrollTop: 0}, 400, 'swing');
        })
      )
    );
  }
})();

// コメント展開ボタンを生成する
(function() {
  var button_id = 'GithubCodeReviewHelper-comment-open-button';

  if (0 === $('#' + button_id).length) {
    $('#partial-discussion-sidebar').append(
      $('<div>').addClass('discussion-sidebar-item').append(
        $('<button>').attr('id', button_id).addClass('btn btn-sm').html('Show all comment').click(function() {
          $('.outdated-comment, .outdated-diff-comment-container').each(function() {
            $(this).addClass('open');
          });


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

// releaseと名の付くブランチの削除ボタンを無効にする
(function() {
  $('.js-branch-row').each(function() {
    var is_release = false;

    $(this).find('.branch-name').each(function() {
      if (-1 !== $(this).text().toLowerCase().indexOf('release')) {
        is_release = true;
        return false; // eachをぬける
      }
    });

    if (is_release) {
      $(this).find('.branch-delete').each(function() {
        $(this).prop('disabled', true).addClass('disabled').attr('aria-label', 'Protected by chrome extension');
      });
    }
  });
})();

// WIPのマージボタンを無効にする
(function() {
  var is_wip = false;

  // WIPとみなす文言
  var wip_str_list = [
    '[wip]',
    '[do_not_merge]',
    '[dont_merge]',
  ];

  $('.js-issue-title').each(function() {
    var title = $(this).text().toLowerCase().replace(/ /g, '_');
    for (var i in wip_str_list) {
      if (-1 !== title.indexOf(wip_str_list[i])) {
        is_wip = true;
        break;
      }
    }
  });

  if (is_wip) {
    $('.merge-message button').each(function() {
      $(this).prop('disabled', true);
    });
  }
})();
