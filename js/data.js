'use strict';

(function () {
  var onError = function (message) {
    window.map.isActivePage = true;
    window.errorMessage(message);
  };
  var onLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    window.data = data;
  };
  window.load('GET', window.util.LOAD_URL, onLoad, onError);
})();
