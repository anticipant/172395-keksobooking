'use strict';

(function () {
  var Price = {
    HIGH: 50000,
    LOW: 10000
  };
  var MAX_FILTERED_ANNOUNCMENT = 5;
  var filters = document.querySelector('.map__filters');
  var featuresInputs = filters.querySelectorAll('#housing-features input');
  var getFilterResult = function (index, selectId) {
    var announcmentObjectVariable = selectId.slice(selectId.indexOf('-') + 1);
    var parameter = document.querySelector('#' + selectId).value;

    return parameter === 'any' || index.offer[announcmentObjectVariable] === parameter || index.offer[announcmentObjectVariable] === +parameter;
  };
  var resetFilter = function () {
    filters.reset();
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
  var filteredArray = function () {
    return window.data.filter(function (announcementNumber) {
      return getFilterResult(announcementNumber, 'housing-type') &&
        getFilterResult(announcementNumber, 'housing-rooms') &&
        getFilterResult(announcementNumber, 'housing-guests') &&
        priceFilterResult(announcementNumber) &&
        featuresFilterResult(announcementNumber);
    });
  };
  var getAndRenderFilteredData = function () {
    var countOfAnnouncments;
    var filteredData = filteredArray();
    window.map.clearMap(true);
    if (filteredData.length <= MAX_FILTERED_ANNOUNCMENT) {
      countOfAnnouncments = filteredData.length;
    } else {
      countOfAnnouncments = MAX_FILTERED_ANNOUNCMENT;
    }
    window.util.showFilteredPins(window.renderPins, window.map.mapPins, filteredData, countOfAnnouncments);
  };
  var updateFilteredAds = function (evt) {
    if (evt.target.classList.contains('map__filter') || evt.target.parentElement.classList.contains('map__filter-set')) {
      window.debounce(getAndRenderFilteredData);
    }
  };
  window.filter = {
    filterBlock: filters,
    updateFilteredAds: updateFilteredAds,
    resetFilter: resetFilter
  };
})();
