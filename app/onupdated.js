// generate tab transfer button
(function() {
  var div_id         = 'GithubCodeReviewHelper-tab-transfer-div';
  var button_id_soft = 'GithubCodeReviewHelper-tab-transfer-soft-button';
  var button_id_hard = 'GithubCodeReviewHelper-tab-transfer-hard-button';

  var div = document.getElementById(div_id);
  if (null === div) {
    // gen soft button
    var button_soft = document.createElement('button');
    button_soft.id        = button_id_soft;
    button_soft.className = 'btn btn-sm';
    button_soft.innerHTML = 'Soft';
    button_soft.onclick   = function() {
      var converter = new TabConverter();
      converter.execSoft();
    };

    // gen hard button
    var button_hard = document.createElement('button');
    button_hard.id        = button_id_hard;
    button_hard.className = 'btn btn-sm';
    button_hard.innerHTML = 'Hard';
    button_hard.onclick   = function() {
      var converter = new TabConverter();
      converter.execHard();
    };

    // gen div
    div = document.createElement('div');
    div.id        = div_id;
    div.innerHTML = 'GithubCodeReviewHelper tab transfer :'

    // add button to div
    div.appendChild(button_soft);
    div.appendChild(button_hard);

    // add div to body
    var body = document.getElementById('js-repo-pjax-container');
    body.insertBefore(document.createElement('hr'), body.firstChild);
    body.insertBefore(div, body.firstChild);
  }
})();

// generate page top button
(function() {
  var button_id = 'GithubCodeReviewHelper-page-top-button';
  var button    = document.getElementById(button_id);
  if (null === button) {
    var elm = document.createElement('button');
    elm.id        = button_id;
    elm.className = 'btn btn-sm';
    elm.innerHTML = 'Page Top';
    elm.onclick   = function() {
      scrollTo(0, 0);
    };
    document.getElementById('js-repo-pjax-container').appendChild(elm);
  }
})();

// resize LGTM
(function() {
  var imgs  = document.getElementsByTagName('img');
  var count = imgs.length;
  for (var i = 0; i < count; i++) {
    if ('LGTM' === imgs[i].alt) {
      imgs[i].style.height = '200px';
    }
  }
})();

// silence jenkinsbot
(function() {
  var comments = document.getElementsByClassName('timeline-comment-wrapper');
  var count    = comments.length;
  for (var i = 0; i < count; i++) {
    if (undefined === comments[i]) {
      continue;
    }

    var childs = comments[i].childNodes;
    if (undefined === childs) {
      continue;
    }

    var child_count = childs.length;
    for (var j = 0; j < child_count; j++) {
      var elm = childs[j];
      if (undefined !== elm.href && -1 !== elm.href.indexOf('jenkinsbot')) {
        comments[i].parentNode.removeChild(comments[i]);
        continue;
      }
    }
  }
})();
