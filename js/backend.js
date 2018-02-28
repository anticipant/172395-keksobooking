'use strict';

(function () {
  window.load = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open(method, url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.send(data);
  };
})();
