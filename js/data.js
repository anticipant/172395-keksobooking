'use strict';

(function () {
  var countOfAnnouncment = 8;
  var announcementTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var announcementTypes = ['flat', 'house', 'bungalo'];
  var announcementCheckinCheckoutValues = ['12:00', '13:00', '14:00'];
  var announcementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  window.data = [];
  var getAnnouncementTitle = function () {
    var valueForDelete = window.util.getRandomInt(0, announcementTitles.length - 1);
    var titleValue = announcementTitles[valueForDelete];

    announcementTitles.splice(valueForDelete, 1);
    return titleValue;
  };


  for (var i = 1; i <= countOfAnnouncment; i++) {
    var locationXCoords = window.util.getRandomInt(300, 900);
    var locationYCoords = window.util.getRandomInt(150, 500);

    window.data.push({
      'id': i,
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'address': locationXCoords + ', ' + locationYCoords,
        'title': getAnnouncementTitle(),
        'price': window.util.getRandomInt(1000, 1000000),
        'type': window.util.getRandomElement(announcementTypes, 1),
        'rooms': window.util.getRandomInt(1, 5),
        'guests': window.util.getRandomInt(1, 100),
        'checkin': window.util.getRandomElement(announcementCheckinCheckoutValues, 1),
        'checkout': window.util.getRandomElement(announcementCheckinCheckoutValues, 1),
        'features': window.util.getRandomElement(announcementFeatures, window.util.getRandomInt(1, announcementFeatures.length)),
        'description': '',
        'photos': window.util.getRandomElement(announcementPhotos, announcementPhotos.length)
      },
      'location': {
        'x': locationXCoords,
        'y': locationYCoords
      }
    });
  }
})();
