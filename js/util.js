'use strict';

(function () {
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
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
  window.util = {
    UPLOAD_URL: UPLOAD_URL,
    LOAD_URL: LOAD_URL,
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement
  };
})();
