import GoogleMapsLoader from 'google-maps';
import dotenv from '../../../dist/env.json';

class mapController {

    constructor($rootScope, $interval, $timeout) {
        let ctrl = this;
        GoogleMapsLoader.KEY = dotenv.API_KEY;
        GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
        ctrl.$rootScope = $rootScope;
        ctrl.titles = [];
        ctrl.distances = [];
        ctrl.favorites = [];
        ctrl.mSize = [];
        ctrl.difficulty = [];
        ctrl.terrain = [];
        ctrl.sizeID = [];
        ctrl.newLat = 0;
        ctrl.newLng = 0;

        ctrl.$rootScope.results = [];

        GoogleMapsLoader.load(function (google) {

            var markers = [];
            let map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 38.041,
                    lng: -84.504
                },
                scrollwheel: false,
                zoom: 10,
                mapTypeId: 'roadmap'
            });
            ctrl.marker = new google.maps.Marker({
                position: {lat: 38.041,
                          lng: -84.504},
                map: map
            });
            markers.push(ctrl.marker);

            let input = document.getElementById('pac-input');
            let searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });

            
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length == 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }

                createMarkers();
              });
              map.fitBounds(bounds);
            });
            
            console.log();

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
            var d = R * c * 0.000621371;
            return d; // returns the distance in meter
            };

            let createMarkers = function(){

            for(let i = 0; i<=25; i++){

                var R = 6378137;

                var w = (16093 * Math.sqrt(Math.random()))/111300;
                var t = 2 * Math.PI * Math.random();
                var ranLat = w * Math.cos(t) 
                var ranLng = w * Math.sin(t)
                console.log(ranLat);

                ctrl.newmarker = new google.maps.Marker({
                    position: {lat: ranLat + markers[0].position.lat(),
                    lng: ranLng+markers[0].position.lng()},
                    map: map,
                    title: "Marker " + i.toString()
                });

                google.maps.event.addListener(ctrl.newmarker, 'click', function() {
                     alert(this.title);
                });    
                ctrl.titles.push(ctrl.newmarker.title);

                let d = (Math.round(getDistance(ctrl.newmarker.position, ctrl.marker.position)*10)/10);
                ctrl.distances.push(d);

                ctrl.ranFav = Math.floor(Math.random() * 100);  
                ctrl.favorites.push(ctrl.ranFav);

                ctrl.size = ["XS", "S", "M", "L", "XL"];
                ctrl.sizeSelect = Math.floor(Math.random() * 5);
                ctrl.s = ctrl.size[ctrl.sizeSelect];
                ctrl.mSize.push(ctrl.s);
                ctrl.sizeID.push(ctrl.sizeSelect);

                ctrl.hardness = ((Math.round(Math.random() * 100))/10).toFixed(1);
                ctrl.difficulty.push(ctrl.hardness);

                ctrl.hill = ((Math.round(Math.random() * 100))/10).toFixed(1);
                ctrl.terrain.push(ctrl.hill);
            }
                var circle = new google.maps.Circle({
                  map: map,
                  radius: 16093,    // 10 miles in metres
                  fillColor: '#AA0000',
                  fillOpacity: 0.01
                });
                circle.bindTo('center', markers[0], 'position');
                
            }  
            createMarkers();
        });
        
        $timeout(function() {
            for(let j=0; j<=25; j++){
            ctrl.$rootScope.results.push(
                {
                    a: ctrl.titles[j],
                    b: ctrl.distances[j],
                    c: ctrl.favorites[j],
                    d: ctrl.mSize[j],
                    e: ctrl.difficulty[j],
                    f: ctrl.terrain[j],
                    g: ctrl.sizeID[j]
                }
            );
        }
        },200)
        
        
    }
    
}
export default mapController;
