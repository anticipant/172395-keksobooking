'use strict';

(function () {
  var onMainPinClick = function () {
    if (!window.map.isActivePage) {
      window.map.mapActivate(true);
      window.form.formActivate(true);
      window.map.isActivePage = true;
      window.map.getPositionOfMainPin();
      window.util.getTemplateList(window.renderPins, window.map.mapPins, false);
      window.form.fillAddressInput(false, true);
      window.map.mapBlock.addEventListener('click', window.map.onPinClick);
      window.form.addFormListeners();
      window.form.formBlock.addEventListener('submit', window.form.onSubmitForm);
      window.form.resetButtom.addEventListener('click', window.form.resetPage);
      window.filter.filterBlock.addEventListener('change', window.filter.updateFilteredAds);
    }
  };
  window.map.mapMainPin.addEventListener('mousedown', window.map.onMouseDown);
  window.map.mapMainPin.addEventListener('mouseup', onMainPinClick);
})();
