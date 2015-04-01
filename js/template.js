;(function (win) {
  'use strict';

  win.Template = function () {
    this.$controllers = {};
    this.$elements    = [];
  };

  Template.prototype.repeatHandler = function (controllerElement) {
    var elements   = controllerElement.querySelectorAll('[data-repeat]');
    var controller = this.$controllers[controllerElement.dataset.controller];

    if (elements.length > 0) {
      [].forEach.call(elements, function (element) {
        var template   = element.innerHTML;
        var exp        = /({{\s*\w+\s*}})/g;
        var newHTML    = [];
        var repeatInfo = element.dataset.repeat.split(' in ');
        var dataValue  = repeatInfo[0];
        var data;

        if (repeatInfo.length > 1) {
          data = controller[repeatInfo[1]];
        } else {
          data = controller[repeatInfo[0]];
        }

        element.innerHTML = '';

        [].forEach.call(data, function (item) {
          var tpl = template;

          if (exp.test(tpl)) {
            var matches = tpl.match(exp);

            [].forEach.call(matches, function (match) {
              var regex = RegExp('\\w+');

              if (regex.test(match)) {
                var result = regex.exec(match)[0];

                if (result === 'this' || result === dataValue) {
                  result = item;
                } else {
                  result = item[result];
                }

                tpl = tpl.replace(match, result);

                newHTML.push(tpl);
              }
            });
          }
        });

        element.innerHTML = newHTML.join('');
      })
    }
  };

  Template.prototype.clickHandler = function (controllerElement) {
    var self       = this;
    var controller = this.$controllers[controllerElement.dataset.controller];
    var elements   = controllerElement.querySelectorAll('[data-click]');

    if (elements.length > 0) {
      controllerElement.addEventListener('click', function (event) {
        var target = event.target;

        [].forEach.call(elements, function (element) {
          if (element === target) {
            var command = ['controller.', element.dataset.click].join('');

            eval(command);
          }
        });
      });
    }
  };

  Template.prototype.controller = function (controllerName, controllerFunction) {
    this.$controllers[controllerName] = controllerFunction;

    var controller        = this.$controllers[controllerName];
    var selector          = ['[data-controller="', controllerName, '"]'].join('');
    var controllerElement = document.querySelector(selector);

    this.$elements.push(controllerElement);

    this.repeatHandler(controllerElement);
    this.clickHandler(controllerElement);

    return this;
  };

}(window));