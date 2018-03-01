'use strict';

(function () {
  var template = document.querySelector('template').content;
  var cardTemplate = template.querySelector('article.map__card');

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
  var render = function (announcement) {
    var cardElement = cardTemplate.cloneNode(true);
    var rooms = announcement.offer.rooms;
    var guests = announcement.offer.guests;
    var guestsWordForm = (announcement.offer.guests) > 1 ? 'гостей' : 'гостя';

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
  var refresh = function (announcements, announcementNumber) {
    var articleCard = document.querySelector('.map .map__card');
    var number = +announcementNumber;
    var announcement = announcements[number];
    var rooms = announcement.offer.rooms;
    var guests = announcement.offer.guests;
    var guestsWordForm = (announcement.offer.guests) > 1 ? 'гостей' : 'гостя';

    articleCard.style.display = 'block';
    articleCard.querySelector('h3').textContent = announcement.offer.title;
    articleCard.querySelector('h3 + p > small').textContent = announcement.offer.address;
    articleCard.querySelector('h4').textContent = getTypeOfHouse(announcement.offer.type[0]);
    articleCard.querySelector('h4 + p').textContent = (rooms + ' ' + getRoomsWordForm(rooms) + ' для ' + guests + ' ' + guestsWordForm);
    articleCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + announcement.offer.checkin + ', выезд до ' + announcement.offer.checkout;
    articleCard.querySelector('.popup__price').innerHTML = (announcement.offer.price + '&#x20bd;/ночь');
    articleCard.querySelector('.popup__features').innerHTML = getListFeatures(announcement.offer.features);
    articleCard.querySelector('.popup__features + p').textContent = announcement.offer.description;
    articleCard.querySelector('.popup__pictures').innerHTML = getListPhotos(announcement.offer.photos);
    articleCard.querySelector('.popup__avatar').setAttribute('src', announcement.author.avatar);
  };
  window.renderCards = {
    render: render,
    refresh: refresh
  };
})();
