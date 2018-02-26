'use strict';

(function () {
  var VERTICAL_SHIFT_OF_MAIN_PIN = 48;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var mainPinPosition = window.map.mainPinPosition;
  var form = document.querySelector('.notice__form');
  var address = form.querySelector('#address');
  var formFieldsets = form.querySelectorAll('fieldset');
  var toggleFormDisabledStatus = function (status) {
    formFieldsets.forEach(function (item) {
      item.disabled = status;
    });
  };
  var fillAddressInput = function (withShift) {
    if (withShift) {
      address.value = mainPinPosition.x + ', ' + (mainPinPosition.y + VERTICAL_SHIFT_OF_MAIN_PIN);
    } else {
      address.value = mainPinPosition.x + ', ' + mainPinPosition.y;
    }
  };

  fillAddressInput();
  toggleFormDisabledStatus(true);
  var formActivate = function () {
    form.classList.remove('notice__form--disabled');
    toggleFormDisabledStatus(false);
  };
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var priceOfApartment = form.querySelector('#price');
  var changeMinValue = function (number) {
    priceOfApartment.setAttribute('min', number);
  };
  var toggleMinPrice = function (evt) {
    var value = evt.target.value;

    switch (value) {
      case 'bungalo':
        changeMinValue(MIN_PRICE_BUNGALO);
        break;
      case 'flat':
        changeMinValue(MIN_PRICE_FLAT);
        break;
      case 'house':
        changeMinValue(MIN_PRICE_HOUSE);
        break;
      case 'palace':
        changeMinValue(MIN_PRICE_PALACE);
        break;
    }
  };
  var toggleTime = function (evt) {
    var targetElement = evt.target;
    var valueOfTarget = targetElement.value;

    switch (targetElement.name) {
      case 'timein':
        timeOut.value = valueOfTarget;
        break;
      case 'timeout':
        timeIn.value = valueOfTarget;
        break;
    }
  };
  var refreshDisabledOption = function (roomQuantity) {
    var countOfOption = capacity.querySelectorAll('[value]').length;

    for (var g = 0; g < countOfOption; g++) {
      if (g <= roomQuantity && g > 0 && roomQuantity !== 100) {
        capacity.querySelector('[value="' + g + '"]').disabled = false;
      } else if (roomQuantity === 100 && g === 0) {
        capacity.querySelector('[value="' + g + '"]').disabled = false;
      } else {
        capacity.querySelector('[value="' + g + '"]').disabled = true;
      }
    }
  };
  var checkingForCompliance = function () {
    var capacityOption = capacity.querySelector('[value="' + capacity.value + '"]');
    var capacityOptionText = capacityOption.textContent;

    roomNumber.setCustomValidity(capacityOption.disabled ? ('Данное количество комнат не рассчитанно ' + capacityOptionText) : '');
  };
  var togglePermitOfAvailableGuests = function (evt) {
    var targetElement = evt.target;
    var valueOfTarget = +targetElement.value;

    refreshDisabledOption(valueOfTarget);
    checkingForCompliance();
  };
  var setErrorBorder = function (thisInput, isNeed) {
    if (isNeed) {
      thisInput.style.border = '2px solid red';
    } else {
      thisInput.style.border = '';
    }
  };
  var checkValdity = function (inputElement) {
    setErrorBorder(inputElement.target, !inputElement.target.validity.valid);
  };
  var addFormListeners = function () {
    document.addEventListener('change', function (evt) {
      var idCompare = evt.target.getAttribute('id');

      if (idCompare === 'title' || idCompare === 'price') {
        checkValdity(evt);
      } else if (idCompare === 'type') {
        toggleMinPrice(evt);
      } else if (idCompare === 'timein' || idCompare === 'timeout') {
        toggleTime(evt);
      } else if (idCompare === 'room_number') {
        togglePermitOfAvailableGuests(evt);
      } else if (idCompare === 'capacity') {
        checkingForCompliance(evt);
      }
    });
    form.querySelectorAll('input:required').forEach(function (item) {
      item.addEventListener('invalid', function () {
        setErrorBorder(item, true);
      });
    });
  };
  window.form = {
    formActivate: formActivate,
    fillAddressInput: fillAddressInput,
    addFormListeners: addFormListeners
  };
  var onError = function (message) {
    console.error(message);
  };

  var onLoad = function (data) {
    console.log(data);
  };
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onLoad, onError);
    evt.preventDefault();
  });
})();
