var GithubCodeReviewHelper = (function() {
  // constructor
  function GithubCodeReviewHelper()
  {
    this.tabstop  = 4;
    this.color    = 'lightgreen';
    this.bg_color = 'none';

    // tab文字を作成する
    this.tab_str_arr = ['|'];
    for (var i = 0; i < this.tabstop - 1; i++) {
      this.tab_str_arr[i + 1] = this.tab_str_arr[i] + '.';
    }
  }

  // public
  function exec()
  {
    var elms  = document.getElementsByClassName('pl-s1');
    var count = elms.length;
    for (var i = 0; i < count; i++) {
      this.pos = 0;
      this.editLine(elms[i])
    }
  }

  function editLine(elm)
  {
    var childs = elm.childNodes;
    if (undefined !== childs) {
      var count = childs.length;
      for (var i = 0; i < count; i++) {
        if ('#text' === childs[i].nodeName) {
          // 置換する
          elm.replaceChild(this.replaceTab(childs[i]), childs[i]);
        } else {
          // 再帰する
          this.editLine(childs[i]);
        }
      }
    }
  }

  function replaceTab(elm)
  {
    // * elmはTextNodeである
    // * 処理のイメージ
    //   * TextNodeをtab文字で分離させる
    //   * tab文字をspanにする
    //   * 結果、次のような構造になる [TextNode, span, TextNode...]
    //   * これを、ひとつのspanにする

    var span = document.createElement('span');

    var text     = elm.textContent;
    var text_len = text.length;

    var fragment    = '';
    var content_arr = [];
    for (var i = 0; i < text_len; i++) {
      var c = text.charAt(i);
      if ("\t" === c) {
        tab_len_seeming = this.tabstop - (this.pos % this.tabstop);
        this.pos += tab_len_seeming;

        var tab_span = document.createElement('span');
        tab_span.style.color = this.color;
//        tab_span.style.backgroundColor = this.bg_color;
        tab_span.textContent = this.tab_str_arr[tab_len_seeming - 1];

        content_arr.push(fragment, tab_span);
        fragment = '';
      } else {
        this.pos++;
        fragment += c;
      }
    }
    content_arr.push(fragment);

    var count = content_arr.length
      for (var i = 0; i < count; i++) {
        if ('' !== content_arr[i]) {
          if ('string' === typeof content_arr[i]) {
            span.appendChild(document.createTextNode(content_arr[i]));
          } else {
            span.appendChild(content_arr[i]);
          }
        }
      }

    return span;
  }

  GithubCodeReviewHelper.prototype = {
    constructor: GithubCodeReviewHelper,
    exec: exec,
    editLine: editLine,
    replaceTab: replaceTab,
  };

  return GithubCodeReviewHelper;
})();

var helper = new GithubCodeReviewHelper();
helper.exec();
