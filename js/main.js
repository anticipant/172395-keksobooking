'use strict';

(function () {
  var isActivePage = false;
  var map = window.map.mapBlock;
  var getTemplateList = function (renderFunction, pasteTarget, isInsertBefore) {
    var fragments = document.createDocumentFragment();

    for (var t = 0; t < window.data.length; t++) {
      fragments.appendChild(renderFunction(window.data[t]));
    }
    if (isInsertBefore) {
      pasteTarget.insertBefore(fragments, isInsertBefore);
    } else {
      pasteTarget.appendChild(fragments);
    }
  };
  var onMainPinClick = function () {
    if (!isActivePage) {
      window.map.mapActivate();
      window.form.formActivate();
      isActivePage = true;
    }
    window.map.getPositionOfMainPin();
    getTemplateList(window.renderPins, window.map.mapPins, false);
    getTemplateList(window.renderCards, map, window.map.mapFilter);
    window.form.fillAddressInput(true);
    window.map.getMapPinArray().forEach(function (item) {
      item.addEventListener('click', window.map.refreshInformation);
    });
    window.form.addFormListeners();
  };
  window.map.mapMainPin.addEventListener('mouseup', onMainPinClick);

})();
