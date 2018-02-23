'use strict';

(function () {
  var heightPin = 70;
  var template = document.querySelector('template').content;
  var pinTemplate = template.querySelector('button.map__pin');
  window.renderPins = function (announcement) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('data-serial-number', announcement.id);
    pinElement.style.left = announcement.location.x + 'px';
    pinElement.style.top = (announcement.location.y - heightPin / 2) + 'px';
    pinElement.querySelector('img').setAttribute('src', announcement.author.avatar);
    return pinElement;
  };
})();
