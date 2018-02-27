'use strict';

(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    window.data = data;
  };

  window.load(onLoad, onError);
})();
