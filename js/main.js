'use strict';

(function () {
  var map = window.map.mapBlock;
  var maxAnnouncment = 5;
  var getTemplateList = function (renderFunction, pasteTarget, isInsertBefore, index) {
    var fragment = document.createDocumentFragment();

    if (isInsertBefore) {
      fragment.appendChild(renderFunction(window.data[index]));
      pasteTarget.insertBefore(fragment, isInsertBefore);
      window.map.onCloseButton();
    } else {
      for (var t = 0; t < maxAnnouncment; t++) {
        fragment.appendChild(renderFunction(window.data[t]));
      }
      pasteTarget.appendChild(fragment);
    }
  };
  var showCard = function (serialNumber) {
    if (!window.map.isCardRender) {
      window.map.isCardRender = true;
      getTemplateList(window.renderCards.render, map, window.map.mapFilter, serialNumber);
    }
    window.renderCards.refresh(window.data, serialNumber);
  };
  var onMainPinClick = function () {
    if (!window.map.isActivePage) {
      window.map.mapActivate(true);
      window.form.formActivate(true);
      window.map.isActivePage = true;
      window.map.getPositionOfMainPin();
      getTemplateList(window.renderPins, window.map.mapPins, false);
      window.form.fillAddressInput(false, true);
      document.addEventListener('click', function (evt) {
        var serialNumber;

        if (evt.target.hasAttribute('data-serial-number')) {
          serialNumber = evt.target.getAttribute('data-serial-number');
          showCard(serialNumber);
        } else if (evt.target.tagName !== 'HTML' && evt.target.parentElement.hasAttribute('data-serial-number')) {
          serialNumber = evt.target.parentElement.getAttribute('data-serial-number');
          showCard(serialNumber);
        }
      });
      window.form.addFormListeners();
    }
  };
  window.map.mapMainPin.addEventListener('mousedown', window.map.onMouseDown);
  window.map.mapMainPin.addEventListener('mouseup', onMainPinClick);
})();
