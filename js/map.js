'use strict';
var countOfAnnouncment = 8;
var announcementTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var announcementTypes = ['flat', 'house', 'bungalo'];
var announcementCheckinCheckoutValues = ['12:00', '13:00', '14:00'];
var announcementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];
var getAnnouncementTitle = function () {
  var valueForDelete = getRandomInt(0, announcementTitles.length - 1);
  var titleValue = announcementTitles[valueForDelete];

  announcementTitles.splice(valueForDelete, 1);
  return titleValue;
};
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var compareRandom = function () {
  return Math.random() - 0.5;
};
var getRandomElement = function (arr, quantity) {
  var sortedArr = arr.sort(compareRandom);
  var resultArr = [];

  for (var k = 0; k < quantity; k++) {
    resultArr.push(sortedArr[k]);
  }
  return resultArr;
};
for (var i = 1; i <= countOfAnnouncment; i++) {
  var locationXCoords = getRandomInt(300, 900);
  var locationYCoords = getRandomInt(150, 500);

  announcements.push({
    'id': i,
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png'
    },
    'offer': {
      'address': locationXCoords + ', ' + locationYCoords,
      'title': getAnnouncementTitle(),
      'price': getRandomInt(1000, 1000000),
      'type': getRandomElement(announcementTypes, 1),
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 100),
      'checkin': getRandomElement(announcementCheckinCheckoutValues, 1),
      'checkout': getRandomElement(announcementCheckinCheckoutValues, 1),
      'features': getRandomElement(announcementFeatures, getRandomInt(1, announcementFeatures.length)),
      'description': '',
      'photos': getRandomElement(announcementPhotos, announcementPhotos.length)
    },
    'location': {
      'x': locationXCoords,
      'y': locationYCoords
    }
  });
}

var heightPin = 70;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filters-container');
var template = document.querySelector('template').content;
var cardTemplate = template.querySelector('article.map__card');
var pinTemplate = template.querySelector('button.map__pin');
var renderPins = function (announcement) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('data-serial-number', announcement.id);
  pinElement.style.left = announcement.location.x + 'px';
  pinElement.style.top = (announcement.location.y - heightPin / 2) + 'px';
  pinElement.querySelector('img').setAttribute('src', announcement.author.avatar);
  return pinElement;
};
var getListFeatures = function (feature) {
  var listFeatures = '';

  for (var l = 0; l < feature.length; l++) {
    listFeatures = listFeatures + '<li class="feature feature--' + feature[l] + '"></li>';
  }
  return listFeatures;
};
var getListPhotos = function (photo) {
  var listPhotos = '';

  for (var l = 0; l < photo.length; l++) {
    listPhotos = listPhotos + '<li><img src="' + photo[l] + '" width="70" height="70"></li>';
  }
  return listPhotos;
};
var getRoomsWordForm = function (countOfRooms) {
  if (countOfRooms === 1) {
    return 'комната';
  } else if (countOfRooms < 5) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};
var getTypeOfHouse = function (type) {
  var typeOfHousing;
  switch (type) {
    case 'flat':
      typeOfHousing = 'Квартира';
      break;
    case 'house':
      typeOfHousing = 'Дом';
      break;
    case 'bungalo':
      typeOfHousing = 'Бунгало';
      break;
  }
  return typeOfHousing;
};
var renderCards = function (announcement) {
  var cardElement = cardTemplate.cloneNode(true);
  var rooms = announcement.offer.rooms;
  var guests = announcement.offer.guests;
  var guestsWordForm = (announcement.offer.guests) > 1 ? 'гостей' : 'гостя';

  cardElement.setAttribute('data-serial-number', announcement.id);
  cardElement.style.display = 'none';
  cardElement.querySelector('h3').textContent = announcement.offer.title;
  cardElement.querySelector('h3 + p > small').textContent = announcement.offer.address;
  cardElement.querySelector('h4').textContent = getTypeOfHouse(announcement.offer.type[0]);
  cardElement.querySelector('h4 + p').textContent = (rooms + ' ' + getRoomsWordForm(rooms) + ' для ' + guests + ' ' + guestsWordForm);
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  cardElement.querySelector('.popup__price').innerHTML = (announcement.offer.price + '&#x20bd;/ночь');
  cardElement.querySelector('.popup__features').innerHTML = getListFeatures(announcement.offer.features);
  cardElement.querySelector('.popup__features + p').textContent = announcement.offer.description;
  cardElement.querySelector('.popup__pictures').innerHTML = getListPhotos(announcement.offer.photos);
  cardElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);
  return cardElement;
};
var getTemplateList = function (renderFunction, pasteTarget, isInsertBefore) {
  var fragments = document.createDocumentFragment();

  for (var t = 0; t < announcements.length; t++) {
    fragments.appendChild(renderFunction(announcements[t]));
  }
  if (isInsertBefore) {
    pasteTarget.insertBefore(fragments, isInsertBefore);
  } else {
    pasteTarget.appendChild(fragments);
  }
};
var VERTICAL_SHIFT_OF_MAIN_PIN = 48;
var isActivePage = false;
var form = document.querySelector('.notice__form');
var title = document.querySelector('#title');
var address = document.querySelector('#address');
var formFieldsets = form.querySelectorAll('fieldset');
var mapMainPin = document.querySelector('.map__pin--main');
var mapPinArray;
var mapBlock = document.querySelector('.map');
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
var toggleFormStatus = function (status) {
  formFieldsets.forEach(function (item) {
    item.disabled = status;
  });
};
var refreshInformation = function (evt) {
  var serialNumber = evt.currentTarget.getAttribute('data-serial-number');
  var pinCard = document.querySelector('article[data-serial-number="' + serialNumber + '"]');

  if (previousCard) {
    previousCard.style.display = 'none';
  }
  pinCard.style.display = 'block';
  previousCard = pinCard;
};
var previousCard;
var onMainPinClick = function () {
  if (!isActivePage) {
    mapBlock.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    toggleFormStatus(false);
    isActivePage = true;
  }
  getPositionOfMainPin();
  getTemplateList(renderPins, mapPins, false);
  getTemplateList(renderCards, map, mapFilter);
  mapPinArray = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  address.value = mainPinPosition.x + ', ' + (mainPinPosition.y + VERTICAL_SHIFT_OF_MAIN_PIN);
  mapPinArray.forEach(function (item) {
    item.addEventListener('click', refreshInformation);
  });
  addFormListeners();
};
address.value = mainPinPosition.x + ', ' + mainPinPosition.y;
toggleFormStatus(true);

var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;
var typeOfApartment = form.querySelector('#type');
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
var checkValdity = function (inputElement) {
  if (inputElement.target.validity.valid) {
    deleteErrorBorder(inputElement.target);
  }
};
var deleteErrorBorder = function (thisInput) {
  thisInput.style.border = '';
};
var setErrorBorder = function (thisInput) {
  thisInput.style.border = '2px solid red';
};
var addFormListeners = function () {
  title.addEventListener('change', checkValdity);
  priceOfApartment.addEventListener('change', checkValdity);
  typeOfApartment.addEventListener('change', toggleMinPrice);
  timeIn.addEventListener('change', toggleTime);
  timeOut.addEventListener('change', toggleTime);
  roomNumber.addEventListener('change', togglePermitOfAvailableGuests);
  capacity.addEventListener('change', checkingForCompliance);
  form.querySelectorAll('input:required').forEach(function (item) {
    item.addEventListener('invalid', function () {
      setErrorBorder(item);
    });
  });
};
mapMainPin.addEventListener('mouseup', onMainPinClick);
