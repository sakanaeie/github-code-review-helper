// generate PAGE TOP BUTTON
var button_id = 'GithubCodeReviewHelper-page-top-button';
var button    = document.getElementById(button_id);
if (null === button) {
  var elm = document.createElement('button');
  elm.id        = button_id;
  elm.className = 'btn btn-sm';
  elm.innerHTML = 'PAGE TOP';
  elm.onclick   = function() {
    scrollTo(0, 0);
  };
  document.getElementById('js-repo-pjax-container').appendChild(elm);
}

// resize LGTM
var imgs  = document.getElementsByTagName('img');
var count = imgs.length;
for (var i = 0; i < count; i++) {
  if ('LGTM' === imgs[i].alt) {
    imgs[i].style.height = '200px';
  }
}

// silence jenkinsbot
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
