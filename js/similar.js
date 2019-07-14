'use strict';

(function () {
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.setup.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.setup.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    window.setup.eyesColor = color;
    window.updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    window.setup.coatColor = color;
    window.updateWizards();
  });

  window.updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    window.updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();