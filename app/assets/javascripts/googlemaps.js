var lat = 40.738688,
    lng = -73.993250;


function initMap() {
      console.log('initMap is Running');
         var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 13,
           center: {lat: lat, lng: lng}
         });
         var marker = new google.maps.Marker({
           position: {lat: lat, lng: lng},
           map: map,
           draggable: true,
         });
         google.maps.event.addListener(marker, 'dragend', function (evt) {
             lat = evt.latLng.lat().toString();
             console.log(lat);
             lng = evt.latLng.lng().toString();
             console.log(lng);
         });

       }
