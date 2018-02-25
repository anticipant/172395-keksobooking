'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var map = document.querySelector('.map');
  var dragAndDropArea = map.querySelector('.map__pinsoverlay');
  var mapPins = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapMainPin = map.querySelector('.map__pin--main');
  var getMapPinArray = function () {
    return map.querySelectorAll('.map__pin:not(.map__pin--main)');
  };
  var refreshRegulationValue = function (currentPositionX, currentPositionY) {
    getPositionOfMainPin();
    var regulationValueX = mapMainPin.getBoundingClientRect().left - currentPositionX;
    var regulationValueY = (mapMainPin.getBoundingClientRect().top + pageYOffset) - currentPositionY;
    extremePosition = {
      minX: dragAndDropArea.getBoundingClientRect().left - regulationValueX,
      minY: 100 - regulationValueY,
      maxX: dragAndDropArea.getBoundingClientRect().right - regulationValueX - MAIN_PIN_WIDTH,
      maxY: 700 - regulationValueY - MAIN_PIN_HEIGHT
    };
  };
  var extremePosition = {
    minX: dragAndDropArea.getBoundingClientRect().left,
    minY: 100,
    maxX: dragAndDropArea.getBoundingClientRect().right - MAIN_PIN_WIDTH,
    maxY: 700
  };
  var getAllowedCoordinate = function (min, max, thisCoordinate) {
    if (thisCoordinate < min) {
      return min;
    } else if (thisCoordinate > max) {
      return max;
    } else {
      return thisCoordinate;
    }
  };
  var mainPinPosition = {
    x: 600,
    y: 375
  };
  var getPositionOfMainPin = function () {
    var positionX = mapMainPin.offsetLeft;
    var positionY = mapMainPin.offsetTop;
    mainPinPosition.x = positionX;
    mainPinPosition.y = positionY;
  };
  var previousCard;
  var refreshInformation = function (evt) {
    var serialNumber = evt.currentTarget.getAttribute('data-serial-number');
    var pinCard = map.querySelector('article[data-serial-number="' + serialNumber + '"]');

    if (previousCard) {
      previousCard.style.display = 'none';
    }
    pinCard.style.display = 'block';
    previousCard = pinCard;
  };
  var mapActivate = function () {
    map.classList.remove('map--faded');
  };
  var onMouseDown = function (evt) {
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };
    refreshRegulationValue(evt.pageX, evt.pageY);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getPositionOfMainPin();
      var shift = {
        x: startCoords.x - getAllowedCoordinate(extremePosition.minX, extremePosition.maxX, moveEvt.pageX),
        y: startCoords.y - getAllowedCoordinate(extremePosition.minY, extremePosition.maxY, moveEvt.pageY)
      };
      startCoords = {
        x: getAllowedCoordinate(extremePosition.minX, extremePosition.maxX, moveEvt.pageX),
        y: getAllowedCoordinate(extremePosition.minY, extremePosition.maxY, moveEvt.pageY)
      };
      window.form.fillAddressInput(true);
      mapMainPin.style.top = (mapMainPin.offsetTop - shift.y) + 'px';
      mapMainPin.style.left = (mapMainPin.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.map = {
    getMapPinArray: getMapPinArray,
    mapBlock: map,
    mapMainPin: mapMainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    getPositionOfMainPin: getPositionOfMainPin,
    mainPinPosition: mainPinPosition,
    refreshInformation: refreshInformation,
    mapActivate: mapActivate,
    onMouseDown: onMouseDown
  };
})();
