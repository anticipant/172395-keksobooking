'use strict';

(function () {
  var map = window.map.mapBlock;
  var maxAnnouncment = 5;
  var getTemplateList = function (renderFunction, pasteTarget, isInsertBefore) {
    var fragments = document.createDocumentFragment();


    if (isInsertBefore) {
      fragments.appendChild(renderFunction(window.data[0]));
      pasteTarget.insertBefore(fragments, isInsertBefore);
      window.map.onCloseButton();
    } else {
      for (var t = 0; t < maxAnnouncment; t++) {
        fragments.appendChild(renderFunction(window.data[t]));
      }
      pasteTarget.appendChild(fragments);
    }
  };
  var onMainPinClick = function () {
    if (!window.map.isActivePage) {
      window.map.mapActivate(true);
      window.form.formActivate(true);
      window.map.isActivePage = true;
    }
    window.map.getPositionOfMainPin();
    getTemplateList(window.renderPins, window.map.mapPins, false); // обновить после xhr
    getTemplateList(window.renderCards.render, map, window.map.mapFilter); // обновить после xhr
    window.form.fillAddressInput(true);
    window.map.getMapPinArray().forEach(function (item) {

      item.addEventListener('click', function (evt) {
        var serialNumber = evt.currentTarget.getAttribute('data-serial-number');
        window.renderCards.refresh(window.data, serialNumber);
      });
    });
    window.form.addFormListeners();
  };
  window.map.mapMainPin.addEventListener('mousedown', window.map.onMouseDown);
  window.map.mapMainPin.addEventListener('mouseup', onMainPinClick);
})();
