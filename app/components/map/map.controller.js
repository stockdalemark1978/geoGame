import GoogleMapsLoader from 'google-maps';
import dotenv from '../../../dist/env.json';

class mapController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        GoogleMapsLoader.KEY = dotenv.API_KEY;
        ctrl.$rootScope = $rootScope;
        ctrl.title = "MarkMail";
        ctrl.distances = [];
        
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
            let rad = function(x) {
            return x * Math.PI / 180;
            };
                
            let getDistance = function(p1, p2) {
            var R = 6378137; // Earth's mean radius in meter
            var dLat = rad(p2.lat() - p1.lat());
            var dLong = rad(p2.lng() - p1.lng());
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d; // returns the distance in meter
            };

            for(let i = 0; i<=25; i++){
                ctrl.ranLat = Math.random()- 0.5;
                ctrl.ranLng = Math.random()- 0.5;
                ctrl.newmarker = new google.maps.Marker({
                position: {lat: -34.397+ctrl.ranLat,
                lng: 150.644+ctrl.ranLng},
                map: map,
                title: "Marker " + i.toString()
                });
                google.maps.event.addListener(ctrl.newmarker, 'click', function() {
                 alert(this.title);
            });    
                let y = getDistance(ctrl.newmarker.position, ctrl.marker.position);
                ctrl.distances.push(y);  
            }  
        });
        console.log(ctrl.distances);
        ctrl.$rootScope.distances = "hello !"
        
    }
    
}
export default mapController;
