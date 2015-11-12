var lat = "40.738688",
    lng = "-73.993250";

var map;
function initMap() {

    setTimeout(function(){


      console.log('initMap is Running');
          map = new google.maps.Map(document.getElementById('map'), {
           zoom: 13,
           center: {lat: parseFloat(lat), lng: parseFloat(lng)}
         });
         var marker = new google.maps.Marker({
           position: {lat: parseFloat(lat), lng: parseFloat(lng)},
           map: map,
           draggable: true,
         });
         google.maps.event.addListener(marker, 'dragend', function (evt) {
             lat = evt.latLng.lat().toString();
             console.log(lat);
             lng = evt.latLng.lng().toString();
             console.log(lng);
         });
       },10);
}

// function updateMap(){
//   console.log("yo");
//   map.setCenter({lat:parseFloat(lat),lng:parseFloat(lng)});
// }
