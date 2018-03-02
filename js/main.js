'use strict';

(function () {
  var map = window.map.mapBlock;
  var maxAnnouncment = 5;
  var getTemplateList = function (renderFunction, pasteTarget, isInsertBefore, index) {
    var fragments = document.createDocumentFragment();

    if (isInsertBefore) {
      fragments.appendChild(renderFunction(window.data[index]));
      pasteTarget.insertBefore(fragments, isInsertBefore);
      window.map.onCloseButton();
    } else {
      for (var t = 0; t < maxAnnouncment; t++) {
        fragments.appendChild(renderFunction(window.data[t]));
      }
      pasteTarget.appendChild(fragments);
    }
  };
  var showCard = function (serialNumber) {
    if (!window.map.isCardRender) {
      window.map.isCardRender = true;
      getTemplateList(window.renderCards.render, map, window.map.mapFilter, serialNumber); // обновить после xhr
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
      window.form.fillAddressInput(true);
      document.addEventListener('click', function (evt) {
        var serialNumber;

        if (evt.target.hasAttribute('data-serial-number')) {
          serialNumber = evt.target.getAttribute('data-serial-number');
          showCard(serialNumber);
        } else if (evt.target.parentElement.hasAttribute('data-serial-number')) {
          serialNumber = evt.target.parentElement.getAttribute('data-serial-number');
          showCard(serialNumber);
        }
      });
      window.form.addFormListeners();
    }
  };
  window.map.mapMainPin.addEventListener('mousedown', window.map.onMouseDown);
  window.map.mapMainPin.addEventListener('mouseup', onMainPinClick);

  // document.addEventListener('change', function( evt) {
  //   if (evt.target.classList.contains('map__filter') || evt.target.parentElement.classList.contains('map__filter-set')) {
  //     var boom = window.data.filter(function (ann) {
  //       return window.updateFilteredAds(ann);
  //     });
  //     window.map.clearMap();
  //     getTemplateList(window.renderPins, window.map.mapPins, false); // обновить после xhr
  //   }
  // });
})();
