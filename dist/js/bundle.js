(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = require('./app.html');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app.controller');

var _app4 = _interopRequireDefault(_app3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app4.default.$inject = ['$rootScope', '$interval', '$timeout'];

var appComponent = {
    template: _app2.default,
    controller: _app4.default
};

exports.default = appComponent;

},{"./app.controller":2,"./app.html":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appCtrl = function appCtrl() {
    _classCallCheck(this, appCtrl);

    var ctrl = this;
};

exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "\n<navbar></navbar>\n\n<navbar2 id=\"nav2\"></navbar2>\n<map></map>\n<results></results>\n\n<!--<navbar2></navbar2>\n<map></map>\n<results></results>-->\n";

},{}],4:[function(require,module,exports){
'use strict';

var _app = require('./app.component');

var _app2 = _interopRequireDefault(_app);

var _navbar = require('./components/navbar/navbar.component');

var _navbar2 = _interopRequireDefault(_navbar);

var _navbar3 = require('./components/navbar2/navbar2.component');

var _navbar4 = _interopRequireDefault(_navbar3);

var _map = require('./components/map/map.component');

var _map2 = _interopRequireDefault(_map);

var _results = require('./components/results/results.component');

var _results2 = _interopRequireDefault(_results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', []).component('app', _app2.default).component('navbar', _navbar2.default).component('navbar2', _navbar4.default).component('map', _map2.default).component('results', _results2.default); // 'use strict'

},{"./app.component":1,"./components/map/map.component":5,"./components/navbar/navbar.component":8,"./components/navbar2/navbar2.component":11,"./components/results/results.component":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map = require('./map.html');

var _map2 = _interopRequireDefault(_map);

var _map3 = require('./map.controller');

var _map4 = _interopRequireDefault(_map3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapComponent = {
    bindings: {},
    template: _map2.default,
    controller: ['$rootScope', '$interval', '$timeout', _map4.default],
    controllerAs: '$ctrl'
};

exports.default = mapComponent;

},{"./map.controller":6,"./map.html":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _googleMaps = require('google-maps');

var _googleMaps2 = _interopRequireDefault(_googleMaps);

var _env = require('../../../dist/env.json');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mapController = function mapController($rootScope, $interval, $timeout) {
    _classCallCheck(this, mapController);

    var ctrl = this;
    _googleMaps2.default.KEY = _env2.default.API_KEY;
    _googleMaps2.default.LIBRARIES = ['geometry', 'places'];
    ctrl.$rootScope = $rootScope;
    ctrl.titles = [];
    ctrl.distances = [];
    ctrl.favorites = [];
    ctrl.mSize = [];
    ctrl.difficulty = [];
    ctrl.terrain = [];
    ctrl.sizeID = [];

    ctrl.$rootScope.results = [];

    _googleMaps2.default.load(function (google) {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            scrollwheel: false,
            zoom: 8,
            mapTypeId: 'roadmap'
        });
        ctrl.marker = new google.maps.Marker({
            position: { lat: -34.397,
                lng: 150.644 },
            map: map
        });

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
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
            });
            map.fitBounds(bounds);
        });

        var rad = function rad(x) {
            return x * Math.PI / 180;
        };

        var getDistance = function getDistance(p1, p2) {
            var R = 6378137; // Earth's mean radius in meter
            var dLat = rad(p2.lat() - p1.lat());
            var dLong = rad(p2.lng() - p1.lng());
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c * 0.000621371;
            return d; // returns the distance in meter
        };

        for (var i = 0; i <= 25; i++) {
            ctrl.ranLat = Math.random() - 0.5;
            ctrl.ranLng = Math.random() - 0.5;
            ctrl.newmarker = new google.maps.Marker({
                position: { lat: -34.397 + ctrl.ranLat,
                    lng: 150.644 + ctrl.ranLng },
                map: map,
                title: "Marker " + i.toString()
            });
            google.maps.event.addListener(ctrl.newmarker, 'click', function () {
                alert(this.title);
            });
            ctrl.titles.push(ctrl.newmarker.title);

            var d = Math.round(getDistance(ctrl.newmarker.position, ctrl.marker.position) * 10) / 10;
            ctrl.distances.push(d);

            ctrl.ranFav = Math.floor(Math.random() * 100);
            ctrl.favorites.push(ctrl.ranFav);

            ctrl.size = ["XS", "S", "M", "L", "XL"];
            ctrl.sizeSelect = Math.floor(Math.random() * 5);
            ctrl.s = ctrl.size[ctrl.sizeSelect];
            ctrl.mSize.push(ctrl.s);
            ctrl.sizeID.push(ctrl.sizeSelect);

            ctrl.hardness = (Math.round(Math.random() * 100) / 10).toFixed(1);
            ctrl.difficulty.push(ctrl.hardness);

            ctrl.hill = (Math.round(Math.random() * 100) / 10).toFixed(1);
            ctrl.terrain.push(ctrl.hill);
        }
    });

    $timeout(function () {
        for (var j = 0; j <= 25; j++) {
            ctrl.$rootScope.results.push({
                a: ctrl.titles[j],
                b: ctrl.distances[j],
                c: ctrl.favorites[j],
                d: ctrl.mSize[j],
                e: ctrl.difficulty[j],
                f: ctrl.terrain[j],
                g: ctrl.sizeID[j]
            });
        }
    }, 200);
};

exports.default = mapController;

},{"../../../dist/env.json":17,"google-maps":18}],7:[function(require,module,exports){
module.exports = "<div class=\"container\" id=\"search\">\n    <div class=\"row\">\n        <div class=\"col-sm-6 col-sm-offset-3\">\n            <div id=\"imaginary_container\"> \n                <div class=\"input-group stylish-input-group\">\n                    <input type=\"text\" class=\"form-control\" id=\"pac-input\" placeholder=\"Search\" >\n                    \n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div id=\"map\" style=\"width:100%;height:500px\"></div>\n\n<!--<h1>{{$ctrl.$rootScope.mark}}</h1>\n<h2>{{$ctrl.title}}</h2>-->\n\n\n\n\n\n";

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navbar = require('./navbar.html');

var _navbar2 = _interopRequireDefault(_navbar);

var _navbar3 = require('./navbar.controller');

var _navbar4 = _interopRequireDefault(_navbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navbarComponent = {
    bindings: {},
    template: _navbar2.default,
    controller: ['$rootScope', '$interval', _navbar4.default],
    controllerAs: '$ctrl'
};

exports.default = navbarComponent;

},{"./navbar.controller":9,"./navbar.html":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var navbarController = function navbarController($rootScope, $interval) {
    _classCallCheck(this, navbarController);

    var ctrl = this;
    ctrl.$rootScope = $rootScope;
    ctrl.title = "MarkMail";
};

exports.default = navbarController;

},{}],10:[function(require,module,exports){
module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n    </div>\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n      </ul>\n      <!--<form class=\"navbar-form navbar-left\">\n        <div class=\"form-group\">\n          <input id=\"search\" type=\"text\" class=\"form-control\" placeholder=\"Search\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n      </form>-->\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n  <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\n</button>   Profile     </li>\n        \n        <li class=\"dropdown drop\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"><button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\">\n  <span class=\"glyphicon glyphicon-chevron-down\" aria-hidden=\"true\"></span>\n</button></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Action</a></li>\n            <li><a href=\"#\">Another action</a></li>\n            <li><a href=\"#\">Something else here</a></li>\n            <li role=\"separator\" class=\"divider\"></li>\n            <li><a href=\"#\">Separated link</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  </div><!-- /.container-fluid -->\n</nav>";

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _navbar = require('./navbar2.html');

var _navbar2 = _interopRequireDefault(_navbar);

var _navbar3 = require('./navbar2.controller');

var _navbar4 = _interopRequireDefault(_navbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navbar2Component = {
    bindings: {},
    template: _navbar2.default,
    controller: ['$rootScope', '$interval', _navbar4.default],
    controllerAs: '$ctrl'
};

exports.default = navbar2Component;

},{"./navbar2.controller":12,"./navbar2.html":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var navbar2Controller = function navbar2Controller($rootScope, $interval) {
    _classCallCheck(this, navbar2Controller);

    var ctrl = this;
    ctrl.$rootScope = $rootScope;
    ctrl.title = "MarkMail";
};

exports.default = navbar2Controller;

},{}],13:[function(require,module,exports){
module.exports = "<ul class=\"nav nav-pills\">\n  <li id=\"logoli\"><img id=\"logo\" src=\"./images/geocaching-200.png\"></li>\n  <li role=\"presentation\" ><a href=\"#\">Learn</a></li>\n  <li role=\"presentation\"><a href=\"#\">Play</a></li>\n  <li role=\"presentation\"><a href=\"#\">Community</a></li>\n  <li role=\"presentation\"><a href=\"#\">Shop</a></li>\n</ul>\n";

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _results = require('./results.html');

var _results2 = _interopRequireDefault(_results);

var _results3 = require('./results.controller');

var _results4 = _interopRequireDefault(_results3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resultsComponent = {
    bindings: {},
    template: _results2.default,
    controller: ['$rootScope', '$interval', '$timeout', _results4.default],
    controllerAs: '$ctrl'
};

exports.default = resultsComponent;

},{"./results.controller":15,"./results.html":16}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var resultsController = function () {
    function resultsController($rootScope, $interval, $timeout) {
        _classCallCheck(this, resultsController);

        var ctrl = this;
        ctrl.$rootScope = $rootScope;

        ctrl.$rootScope.headers = {
            a: "Geocache Name",
            b: "Distance",
            c: "Favorites",
            d: "Size",
            e: "Difficulty",
            f: "Terrain"
        };

        ctrl.sort = {
            column: 'b',
            descending: false
        };
    }

    _createClass(resultsController, [{
        key: "changeSorting",
        value: function changeSorting(column) {
            var ctrl = this;
            var sort = ctrl.sort;
            if (column == "d" || column == "-d") {
                if (sort.column == "g") {
                    sort.descending = !sort.descending;
                    if (sort.descending == true) {
                        sort.column = "-" + "g";
                    }
                } else {
                    sort.column = "g";
                    sort.descending = false;
                }
            } else {

                if (sort.column == column) {
                    sort.descending = !sort.descending;
                    if (sort.descending == true) {
                        sort.column = "-" + sort.column;
                    }
                } else {
                    sort.column = column;
                    sort.descending = false;
                }
            };
        }
    }]);

    return resultsController;
}();

exports.default = resultsController;

},{}],16:[function(require,module,exports){
module.exports = "<h1>Results</h1>\n<div class=\"table-responsive\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th ng:repeat=\"(i,th) in $ctrl.$rootScope.headers\" ng:click=\"$ctrl.changeSorting(i)\">{{th}}</th>\n      </tr> \n  </thead>\n    <tbody>\n       <tr ng:repeat=\"result in $ctrl.$rootScope.results | orderBy: $ctrl.sort.column\">\n        <td>{{result.a}}</td>\n        <td>{{result.b}} mi</td>\n        <td>{{result.c}}</td>\n        <td>{{result.d}}</td>\n        <td>{{result.e}}</td>\n        <td>{{result.f}}</td>\n      </tr>   \n    </tbody>\n  </table>\n</div>\n\n\n\n\n";

},{}],17:[function(require,module,exports){
module.exports={"API_KEY":"AIzaSyCBmZfM9wovJA8wBB6OyvZO8KolR7gB3PA"}
},{}],18:[function(require,module,exports){
(function(root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}

})(typeof window !== 'undefined' ? window : null, function() {


	'use strict';


	var googleVersion = '3.18';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;


	var GoogleMapsLoader = {};


	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


	GoogleMapsLoader._googleMockApiObject = {};


	GoogleMapsLoader.load = function(fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};


	GoogleMapsLoader.createLoader = function() {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};


	GoogleMapsLoader.isLoaded = function() {
		return google !== null;
	};


	GoogleMapsLoader.createUrl = function() {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		return url;
	};


	GoogleMapsLoader.release = function(fn) {
		var release = function() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function() {
				release();
			});
		} else {
			release();
		}
	};


	GoogleMapsLoader.onLoad = function(fn) {
		onLoadEvents.push(fn);
	};


	GoogleMapsLoader.makeMock = function() {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function() {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};


	var ready = function(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};


	return GoogleMapsLoader;

});

},{}]},{},[4]);
