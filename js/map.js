'use strict';
var countOfAnnouncment = 8;
var announcementTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var announcementTypes = ['Квартира', 'Дом', 'Бунгало'];
var announcementCheckinCheckoutValues = ['12:00', '13:00', '14:00'];
var announcementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];

for (var i = 1; i <= countOfAnnouncment; i++) {
  var locationXCoords = getRandomInt(300, 900);
  var locationYCoords = getRandomInt(150, 500);

  announcements.push({
    'author': {
      'avatar': 'img/avatars/user0' + i + '.png'
    },
    'offer': {
      'adress': locationXCoords + ', ' + locationYCoords,
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
function getAnnouncementTitle() {
  var valueForDelete = getRandomInt(0, announcementTitles.length - 1);
  var titleValue = announcementTitles[valueForDelete];

  announcementTitles.splice(valueForDelete, 1);
  return titleValue;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function compareRandom() {
  return Math.random() - 0.5;
}
function getRandomElement(arr, quantity) {
  var sortedArr = arr.sort(compareRandom);
  var resultArr = [];

  for (var k = 0; k < quantity; k++) {
    resultArr.push(sortedArr[k]);
  }
  return resultArr;
}
var heightPin = 70;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFilter = document.querySelector('.map__filters-container');
var template = document.querySelector('template').content;
var cardTemplate = template.querySelector('article.map__card');
var pinTemplate = template.querySelector('button.map__pin');
function renderPins(announcement) {
  var pinElement = pinTemplate.cloneNode(true);

  // console.log(announcement.offer.title + '  x='+announcement.location.x+' y=' + announcement.location.y); // Действительный адрес маркера
  pinElement.style.left = announcement.location.x + 'px'; // translate выставляет на середину
  pinElement.style.top = (announcement.location.y - heightPin / 2) + 'px'; // учитываю оставшуюся после translateY половину высоты
  pinElement.querySelector('img').setAttribute('src', announcement.author.avatar);
  return pinElement;
}
function getListFeatures(feature) {
  var listFeatures = '';

  for (var l = 0; l < feature.length; l++) {
    listFeatures = listFeatures + '<li class="feature feature--' + feature[l] + '"></li>';
  }
  return listFeatures;
}
function getListPhotos(photo) {
  var listPhotos = '';

  for (var l = 0; l < photo.length; l++) {
    listPhotos = listPhotos + '<li><img src="' + photo[l] + '" width="70" height="70"></li>';
  }
  return listPhotos;
}
function renderCards(announcement) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('h3').textContent = announcement.offer.title;
  cardElement.querySelector('h3 + p > small').textContent = announcement.offer.adress;
  cardElement.querySelector('h4').textContent = announcement.offer.type;
  var rooms = announcement.offer.rooms;
  var roomsWordForm;

  if (rooms === 1) {
    roomsWordForm = 'комната';
  } else if (rooms < 5) {
    roomsWordForm = 'комнаты';
  } else {
    roomsWordForm = 'комнат';
  }
  var guests = announcement.offer.rooms;
  var guestsWordForm = (announcement.offer.guests) > 1 ? 'гостей' : 'гостя';

  cardElement.querySelector('h4 + p').textContent = (rooms + ' ' + roomsWordForm + ' для ' + guests + ' ' + guestsWordForm);
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
  cardElement.querySelector('.popup__price').innerHTML = (announcement.offer.price + '&#x20bd;/ночь');
  cardElement.querySelector('.popup__features').innerHTML = getListFeatures(announcement.offer.features);
  cardElement.querySelector('.popup__features + p').textContent = announcement.offer.description;
  cardElement.querySelector('.popup__pictures').innerHTML = getListPhotos(announcement.offer.photos);
  cardElement.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);
  return cardElement;
}
function getTemplateList(renderFunction, pasteTarget, isInsertBefore) {
  var fragments = document.createDocumentFragment();

  for (var t = 0; t < announcements.length; t++) {
    fragments.appendChild(renderFunction(announcements[t]));
  }
  if (isInsertBefore) {
    pasteTarget.insertBefore(fragments, isInsertBefore);
  } else {
    pasteTarget.appendChild(fragments);
  }
}
getTemplateList(renderPins, mapPins, false);
getTemplateList(renderCards, map, mapFilter);
