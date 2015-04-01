;(function (win) {
  'use strict';

  win.Template = function () {
    this.$controllers = {};
    this.$elements    = [];
  };

  Template.prototype.clickHadler = function (controllerElement) {
    var self       = this;
    var controller = this.$controllers[controllerElement.dataset.controller];
    var elements   = document.querySelectorAll('[data-click]');

    controllerElement.addEventListener('click', function (event) {
      var target = event.target;

      [].forEach.call(elements, function (element) {
        if (element === target) {
          var command = ['controller.', element.dataset.click].join('');

          eval(command);
        }
      });
    });

    // [].forEach.call(elements, function (element) {
    //   element.addEventListener('click', function () {
    //     eval('controller.' + element.dataset.click);
    //   })
    // })
  };

  Template.prototype.repeatHandler = function () {

  };

  Template.prototype.controller = function (controllerName, controllerFunction) {
    this.$controllers[controllerName] = controllerFunction;

    var controller        = this.$controllers[controllerName];
    var selector          = ['[data-controller="', controllerName, '"]'].join('');
    var controllerElement = document.querySelector(selector);

    this.$elements.push(controllerElement);

    this.clickHadler(controllerElement);
  };

}(window));

var app = new Template();

app.controller('filesController', {
  files: ['index.html', 'app.js', 'styles.css'],
  
  open: function () {
    console.log(this.files);
  }
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