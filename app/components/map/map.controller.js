import GoogleMapsLoader from 'google-maps';
import dotenv from '../../../dist/env.json';
class mapController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        GoogleMapsLoader.KEY = dotenv.API_KEY;
        ctrl.$rootScope = $rootScope;
        ctrl.title = "MarkMail";
        GoogleMapsLoader.load(function (google) {
            
            let map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                scrollwheel: false,
                zoom: 8
            });
            ctrl.marker = new google.maps.Marker({
            position: {lat: -34.397,
                      lng: 150.644},
            map: map
        });
            for(let i = 0; i<=25; i++){
                ctrl.ranLat = Math.random()- 0.5;
                ctrl.ranLng = Math.random()- 0.5;
                ctrl.newmarker = new google.maps.Marker({
                position: {lat: -34.397+ctrl.ranLat,
                      lng: 150.644+ctrl.ranLng},
                map: map
                 });
            }
        });
        
        ctrl.$rootScope.distances = "hello poop"
        
    console.log(ctrl.title);
    }
    
}
export default mapController;



// function myMap() {
//   ctrl.mapCanvas = document.getElementById("map");
//   ctrl.myCenter = new google.maps.LatLng(51.508742,-0.120850);
//   ctrl.mapOptions = {center: myCenter, zoom: 9};
//   ctrl.map = new google.maps.Map(mapCanvas,mapOptions);
//   ctrl.marker = new google.maps.Marker({
//     position: myCenter,

//   });
//   for (var i=0; i<=25; i++){
//     ctrl.ranLat = Math.random()- 0.5;
//     ctrl.ranLng = Math.random()- 0.5;
//     ctrl.newCenter = new google.maps.LatLng(51.508742+ranLat,-0.120850+ranLng);

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