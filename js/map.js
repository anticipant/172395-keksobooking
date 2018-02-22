'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapMainPin = map.querySelector('.map__pin--main');
  var getMapPinArray = function () {
    return map.querySelectorAll('.map__pin:not(.map__pin--main)');
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

  window.map = {
    getMapPinArray: getMapPinArray,
    mapBlock: map,
    mapMainPin: mapMainPin,
    mapPins: mapPins,
    mapFilter: mapFilter,
    getPositionOfMainPin: getPositionOfMainPin,
    mainPinPosition: mainPinPosition,
    refreshInformation: refreshInformation,
    mapActivate: mapActivate
  };
})();
