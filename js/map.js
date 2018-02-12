'use strict';
var countOfAnnouncment = 8;
var announcementTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var announcementTypes = ['flat', 'house', 'bungalo'];
var announcementCheckinCheckoutValues = ['12:00', '13:00', '14:00'];
var announcementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcements = [];
for (var i = 1; i <= countOfAnnouncment; i++) {
  announcements.push({
    'author': {
      'avatar': 'img/avatars/user{{0' + i + '}}.png'
    },
    'offer': {
      'title': (function () {
        var valueForDelete = getRandomInt(0, announcementTitles.length - 1);
        var titleValue = announcementTitles[valueForDelete];
        announcementTitles.splice(valueForDelete, 1);
        return titleValue;

      })(),
      'address': '{{location.x}}, {{location.y}}',
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
      'x': getRandomInt(300, 900),
      'y': getRandomInt(150, 500)
    }
  });
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
  if (quantity === 1) {
    return resultArr[0];
  }
  return resultArr;
}


