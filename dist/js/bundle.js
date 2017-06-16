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

_app4.default.$inject = ['$rootScope', '$interval'];

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

// 'use strict'
require('dotenv').config();

angular.module('app', []).component('app', _app2.default).component('navbar', _navbar2.default).component('navbar2', _navbar4.default).component('map', _map2.default).component('results', _results2.default);

},{"./app.component":1,"./components/map/map.component":5,"./components/navbar/navbar.component":8,"./components/navbar2/navbar2.component":11,"./components/results/results.component":14,"dotenv":19}],5:[function(require,module,exports){
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
    controller: ['$rootScope', '$interval', _map4.default],
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

var mapController = function mapController($rootScope, $interval) {
    _classCallCheck(this, mapController);

    var ctrl = this;
    _googleMaps2.default.KEY = _env2.default.API_KEY;
    ctrl.$rootScope = $rootScope;
    ctrl.title = "MarkMail";
    _googleMaps2.default.load(function (google) {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            scrollwheel: false,
            zoom: 8
        });
        ctrl.marker = new google.maps.Marker({
            position: { lat: -34.397,
                lng: 150.644 },
            map: map
        });
        for (var i = 0; i <= 25; i++) {
            ctrl.ranLat = Math.random() - 0.5;
            ctrl.ranLng = Math.random() - 0.5;
            ctrl.newmarker = new google.maps.Marker({
                position: { lat: -34.397 + ctrl.ranLat,
                    lng: 150.644 + ctrl.ranLng },
                map: map
            });
        }
    });

    ctrl.$rootScope.distances = "hello poop";

    console.log(ctrl.title);
};

exports.default = mapController;

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

},{"../../../dist/env.json":17,"google-maps":20}],7:[function(require,module,exports){
module.exports = "\n\n<div id=\"map\" style=\"width:100%;height:500px\"></div>\n\n<h1>{{$ctrl.$rootScope.mark}}</h1>\n<h2>{{$ctrl.title}}</h2>\n\n\n\n\n\n";

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
module.exports = "<ul class=\"nav nav-pills\">\n  <li id=\"logoli\"><img id=\"logo\" src=\"./images/geocaching-200.png\"></li>\n  <li role=\"presentation\" ><a href=\"#\">Learns</a></li>\n  <li role=\"presentation\"><a href=\"#\">Play</a></li>\n  <li role=\"presentation\"><a href=\"#\">Community</a></li>\n  <li role=\"presentation\"><a href=\"#\">Shop</a></li>\n</ul>\n";

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
    controller: ['$rootScope', '$interval', _results4.default],
    controllerAs: '$ctrl'
};

exports.default = resultsComponent;

},{"./results.controller":15,"./results.html":16}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var resultsController = function resultsController($rootScope, $interval) {
    _classCallCheck(this, resultsController);

    var ctrl = this;
    ctrl.$rootScope = $rootScope;
    ctrl.title = "MarkMail";
};

exports.default = resultsController;

},{}],16:[function(require,module,exports){
module.exports = "<h1>Results</h1>\n<div class=\"table-responsive\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th>Geocache Name</th>\n        <th>Distance</th>\n        <th>Favorites</th>\n        <th>Size</th>\n        <th>Difficulty</th>\n        <th>Terrain</th>\n        <th>Last Found</th>\n      </tr>\n  </thead>\n    <tbody>\n      <tr ng-repeat=\"result in results\">\n        <td ng-repeat=\"result in results\">{{result.name}}</td>\n        <td ng-repeat=\"result in results\">{{result.distance}}</td>\n        <td ng-repeat=\"result in results\">{{result.favorites}}</td>\n        <td ng-repeat=\"result in results\">{{result.size}}</td>\n        <td ng-repeat=\"result in results\">{{result.difficulty}}</td>\n        <td ng-repeat=\"result in results\">{{result.terrain}}</td>\n        <td ng-repeat=\"result in results\">{{result.lastFound}}</td>      \n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<h1>{{$ctrl.$rootScope.distances}}</h1>\n\n\n\n";

},{}],17:[function(require,module,exports){
module.exports={"API_KEY":"AIzaSyA_X69XSM3O9LC8VpZkI8Q9R0O5l2VclDk"}
},{}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
(function (process){
'use strict'

var fs = require('fs')

/*
 * Parses a string or buffer into an object
 * @param {String|Buffer} src - source to be parsed
 * @returns {Object}
*/
function parse (src) {
  var obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split('\n').forEach(function (line) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    var keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      var key = keyValueArr[1]

      // default undefined or missing values to empty string
      var value = keyValueArr[2] ? keyValueArr[2] : ''

      // expand newlines in quoted values
      var len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      obj[key] = value
    }
  })

  return obj
}

/*
 * Main entry point into dotenv. Allows configuration before loading .env
 * @param {Object} options - valid options: path ('.env'), encoding ('utf8')
 * @returns {Boolean}
*/
function config (options) {
  var path = '.env'
  var encoding = 'utf8'

  if (options) {
    if (options.path) {
      path = options.path
    }
    if (options.encoding) {
      encoding = options.encoding
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    var parsedObj = parse(fs.readFileSync(path, { encoding: encoding }))

    Object.keys(parsedObj).forEach(function (key) {
      process.env[key] = process.env[key] || parsedObj[key]
    })

    return { parsed: parsedObj }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.load = config
module.exports.parse = parse

}).call(this,require('_process'))
},{"_process":21,"fs":18}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[4]);
