;(function () {
  'use strict';

  var $elements = document.querySelectorAll('[data-repeat]');

  [].forEach.call($elements, function ($el) {
    var $template = $el.innerHTML;
    var $html     = [];
    var data      = window[$el.dataset.repeat];
    var reg       = /({{\w+}})/g;

    $el.innerHTML = '';

    for (var a in data) {
      $html.push($template);

      if (reg.test($html[a])) {
        var matches = $html[a].match(reg);

        for (var i in matches) {
          var regex = RegExp('\\w+');

          if (regex.test(matches[i])) {
            var result = regex.exec(matches[i])[0];

            if (result === 'this') {
              result = data[a];
            } else {
              result = data[a][result];
            }

            $html[a] = $html[a].replace(matches[i], result);
          }
        }
      }
    }

    $el.innerHTML = $html.join('');
  });
}());