'use strict';

(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].id = i;
    }
    // console.log(data);
    window.data = data;
  };

  window.load(onLoad, onError);
})();
