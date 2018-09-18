"use strict";
var templateItem = document.getElementById('slaid-template').innerHTML;
Mustache.parse(templateItem);
var listItems = '';
for (var i = 0; i < slaidData.length; i++) {
    console.log(slaidData);
    listItems += Mustache.render(templateItem, slaidData[i]);
}
var here = document.getElementById('here');
here.insertAdjacentHTML('beforeend', listItems);
var flkty = new Flickity('.main-carousel', {
    // options
    cellAlign: 'left',
    contain: true,
    hash: true,
});
var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function(progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
var buttonReset = document.querySelector('.buttonreset');
buttonReset.addEventListener('click', function(event) {
    flkty.select(0);
});
window.initMap = function() {
    var uluru = {
        lat: 38.446,
        lng: -95.573
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker;
    var addMarker = function() {
        slaidData.forEach(function(data, index) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(data.coords),
                map: map
            });
            google.maps.event.addListener(marker, "click", function() {
                flkty.select(index);
            });
        });
    };
    addMarker();
    flkty.on('change', function(index) {
        map.setCenter(slaidData[index].coords);
        map.setZoom = 4;
    });
}