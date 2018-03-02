'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var PRICE_STEP = {
    HIGH: 50000,
    LOW: 10000
  };
  var MAX_FILTERED_ANNOUNCMENT = 5;
  var lastTimeout;
  var featuresInputs = document.querySelectorAll('#housing-features input');
  var typeFilterResult = function (index) {
    var type = document.querySelector('#housing-type').value;
    if (type === 'any') {
      return true;
    } else {
      return index.offer.type === type;
    }
  };
  var roomsFilterResult = function (index) {
    var rooms = document.querySelector('#housing-rooms').value;
    if (rooms === 'any') {
      return true;
    } else {
      return index.offer.rooms === +rooms;
    }
  };
  var guestsFilterResult = function (index) {
    var guests = document.querySelector('#housing-guests').value;
    if (guests === 'any') {
      return true;
    } else {
      return index.offer.guests === +guests;
    }
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
          result = indexPrice > PRICE_STEP.HIGH;
          break;
        case 'middle':
          result = indexPrice <= PRICE_STEP.HIGH && indexPrice >= PRICE_STEP.LOW;
          break;
        case 'low':
          result = indexPrice < PRICE_STEP.LOW;
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
        var countOfAnnouncment;
        var filteredData = window.data.filter(function (ann) {
          return typeFilterResult(ann) && roomsFilterResult(ann) && guestsFilterResult(ann) && priceFilterResult(ann) && featuresFilterResult(ann);
        });
        window.map.clearMap(true);

        if (filteredData.length <= MAX_FILTERED_ANNOUNCMENT) {
          countOfAnnouncment = filteredData.length;
        } else {
          countOfAnnouncment = MAX_FILTERED_ANNOUNCMENT;
        }
        showFilteredPins(window.renderPins, window.map.mapPins, filteredData, countOfAnnouncment);
      }, DEBOUNCE_INTERVAL);
    }
  };
  document.addEventListener('change', updateFilteredAds);
})();
