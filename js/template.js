;(function (win) {
  'use strict';

  win.Template = function () {
    this.controllers = {};
  }

  Template.prototype.controller = function (controllerName, controllerFunction) {
    this.controllers[controllerName] = controllerFunction;

    var controller = this.controllers[controllerName]();

  }

}(window));

var app = new Template();

app.controller('filesController', function () {
    this.files = ['index.html', 'javascript.js', 'style.css'];

    return this;
  });



/*
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
*/