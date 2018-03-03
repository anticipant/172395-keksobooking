'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var Price = {
    HIGH: 50000,
    LOW: 10000
  };
  var MAX_FILTERED_ANNOUNCMENT = 5;
  var lastTimeout;
  var filters = document.querySelector('.map__filters');
  var featuresInputs = filters.querySelectorAll('#housing-features input');
  var getFilterResult = function (index, selectId) {
    var announcmentObjectVariable = selectId.slice(selectId.indexOf('-') + 1);
    var parameter = document.querySelector('#' + selectId).value;

    return parameter === 'any' || index.offer[announcmentObjectVariable] === parameter || index.offer[announcmentObjectVariable] === +parameter;
  };
  var priceFilterResult = function (index) {
    var price = document.querySelector('#housing-price').value;
    var result;
    var indexPrice = index.offer.price;
    if (price === 'any') {
      return true;
    } else {
      switch (price) {
        case 'high':
          result = indexPrice > Price.HIGH;
          break;
        case 'middle':
          result = indexPrice <= Price.HIGH && indexPrice >= Price.LOW;
          break;
        case 'low':
          result = indexPrice < Price.LOW;
          break;
      }
      return result;
    }
  };
  var featuresFilterResult = function (index) {
    var checkboxFilterArray = [];

    featuresInputs.forEach(function (item) {
      if (item.checked) {
        checkboxFilterArray.push(item.value);
      }
    });
    var features = index.offer.features;

    if (checkboxFilterArray.length === 0) {
      return true;
    } else {
      return checkboxFilterArray.every(function (item) {
        return features.indexOf(item) !== -1;
      });
    }
  };
  var showFilteredPins = function (renderFunction, pasteTarget, data, quantity) {
    var fragments = document.createDocumentFragment();

    for (var t = 0; t < quantity; t++) {
      fragments.appendChild(renderFunction(data[t]));
    }
    pasteTarget.appendChild(fragments);
  };
  var updateFilteredAds = function (evt) {
    if (evt.target.classList.contains('map__filter') || evt.target.parentElement.classList.contains('map__filter-set')) {

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        var countOfAnnouncments; // верно ли я сделал изменив название на мн.ч.
        var filteredData = window.data.filter(function (announcementNumber) {
          return getFilterResult(announcementNumber, 'housing-type') &&
            getFilterResult(announcementNumber, 'housing-rooms') &&
            getFilterResult(announcementNumber, 'housing-guests') &&
            priceFilterResult(announcementNumber) &&
            featuresFilterResult(announcementNumber);
        });
        window.map.clearMap(true);
        if (filteredData.length <= MAX_FILTERED_ANNOUNCMENT) {
          countOfAnnouncments = filteredData.length;
        } else {
          countOfAnnouncments = MAX_FILTERED_ANNOUNCMENT;
        }
        showFilteredPins(window.renderPins, window.map.mapPins, filteredData, countOfAnnouncments);
      }, DEBOUNCE_INTERVAL);
    }
  };
  filters.addEventListener('change', updateFilteredAds);
  window.resetFilter = function () {
    filters.reset();
  };
})();
