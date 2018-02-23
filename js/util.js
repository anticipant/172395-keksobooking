'use strict';

(function () {
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
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement
  };
})();
