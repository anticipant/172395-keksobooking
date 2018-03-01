'use strict';

(function () {
  var DEFAULT_PIN_X_COORD = 600;
  var DEFAULT_PIN_Y_COORD = 375;
  var MAX_TOP_VALUE = 100;
  var MAX_BOTTOM_VALUE = 100;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var isActivePage = false;
  var isCardRender = false;
  var map = document.querySelector('.map');
  var dragAndDropArea = map.querySelector('.map__pinsoverlay');
  var mapPins = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapMainPin = map.querySelector('.map__pin--main');
  var onCloseButton = function () {
    var closePopupButton = map.querySelector('.popup__close');
    var articleCard = map.querySelector('.map__card');
    closePopupButton.addEventListener('click', function () {
      articleCard.style.display = 'none';
    });
  };
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
    minY: MAX_TOP_VALUE,
    maxX: dragAndDropArea.getBoundingClientRect().right - MAIN_PIN_WIDTH,
    maxY: MAX_BOTTOM_VALUE
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
    x: DEFAULT_PIN_X_COORD,
    y: DEFAULT_PIN_Y_COORD
  };
  var getPositionOfMainPin = function () {
    var positionX = mapMainPin.offsetLeft;
    var positionY = mapMainPin.offsetTop;
    mainPinPosition.x = positionX;
    mainPinPosition.y = positionY;
  };
  var mapActivate = function (isActivate) {
    if (isActivate) {
      map.classList.remove('map--faded');
    } else {
      window.map.isActivePage = false;
      map.classList.add('map--faded');
    }
  };
  var clearMap = function () {
    var elementsForRemove = getMapPinArray();
    elementsForRemove.forEach(function (item) {
      item.remove();
    });
    map.querySelector('.map__card').remove();
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
    onCloseButton: onCloseButton,
    isCardRender: isCardRender,
    isActivePage: isActivePage,
    clearMap: clearMap,
    getMapPinArray: getMapPinArray,
    mapBlock: map,
    mapMainPin: mapMainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    getPositionOfMainPin: getPositionOfMainPin,
    mainPinPosition: mainPinPosition,
    mapActivate: mapActivate,
    onMouseDown: onMouseDown
  };
})();
