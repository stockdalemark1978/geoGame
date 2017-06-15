import GoogleMapsLoader from 'google-maps';

class mapController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.title = "MarkMail";
        GoogleMapsLoader.load(function(google){
            let map = new google.maps.Map(document.getElementById('map'),{
                center: {lat: -34.397, lng: 150.644},
                scrollwheel: false,
                zoom: 8
            });
            
       
  });

    }


}

export default mapController;



// function myMap() {
//   var mapCanvas = document.getElementById("map");
//   var myCenter = new google.maps.LatLng(51.508742,-0.120850);
//   var mapOptions = {center: myCenter, zoom: 9};
//   var map = new google.maps.Map(mapCanvas,mapOptions);
//   var marker = new google.maps.Marker({
//     position: myCenter,
    
//   });
//   for (var i=0; i<=25; i++){
//     var ranLat = Math.random()- 0.5;
//     var ranLng = Math.random()- 0.5;
//     var newCenter = new google.maps.LatLng(51.508742+ranLat,-0.120850+ranLng);
    
//     var newMarker = new google.maps.Marker({
//     position: newCenter,
//     customInfo: "Marker "+ i.toString(),
//     customInfo2: "We like Oreos",
//     customInfo3: "Coffee is good"
//     });
//     google.maps.event.addListener(newMarker, 'click', function() {
//     alert(this.customInfo);
//     alert(this.customInfo2);
//     alert(this.customInfo3);
//     });
//     newMarker.setMap(map);
//     }
//   marker.setMap(map);
  


  
// }