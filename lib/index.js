(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wealthscope-partner-sdk"] = factory();
	else
		root["wealthscope-partner-sdk"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/url-join/lib/url-join.js":
/*!***********************************************!*\
  !*** ./node_modules/url-join/lib/url-join.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, context, definition) {\n  if ( true && module.exports) module.exports = definition();\n  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  else {}\n})('urljoin', this, function () {\n\n  function normalize (strArray) {\n    var resultArray = [];\n    if (strArray.length === 0) { return ''; }\n\n    if (typeof strArray[0] !== 'string') {\n      throw new TypeError('Url must be a string. Received ' + strArray[0]);\n    }\n\n    // If the first part is a plain protocol, we combine it with the next part.\n    if (strArray[0].match(/^[^/:]+:\\/*$/) && strArray.length > 1) {\n      var first = strArray.shift();\n      strArray[0] = first + strArray[0];\n    }\n\n    // There must be two or three slashes in the file protocol, two slashes in anything else.\n    if (strArray[0].match(/^file:\\/\\/\\//)) {\n      strArray[0] = strArray[0].replace(/^([^/:]+):\\/*/, '$1:///');\n    } else {\n      strArray[0] = strArray[0].replace(/^([^/:]+):\\/*/, '$1://');\n    }\n\n    for (var i = 0; i < strArray.length; i++) {\n      var component = strArray[i];\n\n      if (typeof component !== 'string') {\n        throw new TypeError('Url must be a string. Received ' + component);\n      }\n\n      if (component === '') { continue; }\n\n      if (i > 0) {\n        // Removing the starting slashes for each component but the first.\n        component = component.replace(/^[\\/]+/, '');\n      }\n      if (i < strArray.length - 1) {\n        // Removing the ending slashes for each component but the last.\n        component = component.replace(/[\\/]+$/, '');\n      } else {\n        // For the last component we will combine multiple slashes to a single one.\n        component = component.replace(/[\\/]+$/, '/');\n      }\n\n      resultArray.push(component);\n\n    }\n\n    var str = resultArray.join('/');\n    // Each input component is now separated by a single slash except the possible first plain protocol part.\n\n    // remove trailing slash before parameters or hash\n    str = str.replace(/\\/(\\?|&|#[^!])/g, '$1');\n\n    // replace ? in parameters with &\n    var parts = str.split('?');\n    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');\n\n    return str;\n  }\n\n  return function () {\n    var input;\n\n    if (typeof arguments[0] === 'object') {\n      input = arguments[0];\n    } else {\n      input = [].slice.call(arguments);\n    }\n\n    return normalize(input);\n  };\n\n});\n\n\n//# sourceURL=webpack://wealthscope-partner-sdk/./node_modules/url-join/lib/url-join.js?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, main, license, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"wealthscope-partner-sdk\\\",\\\"version\\\":\\\"1.1.1\\\",\\\"main\\\":\\\"lib/index.js\\\",\\\"license\\\":\\\"MIT\\\",\\\"scripts\\\":{\\\"start\\\":\\\"webpack --watch\\\",\\\"test\\\":\\\"karma start --single-run --browsers ChromeHeadless karma.conf.js\\\",\\\"build\\\":\\\"webpack\\\"},\\\"dependencies\\\":{\\\"url-join\\\":\\\"^4.0.1\\\"},\\\"devDependencies\\\":{\\\"@babel/core\\\":\\\"^7.1.6\\\",\\\"@babel/preset-env\\\":\\\"^7.1.6\\\",\\\"babel-core\\\":\\\"^6.26.3\\\",\\\"babel-loader\\\":\\\"^8.0.4\\\",\\\"chai\\\":\\\"^4.2.0\\\",\\\"eslint\\\":\\\"^5.9.0\\\",\\\"eslint-config-google\\\":\\\"^0.11.0\\\",\\\"eslint-loader\\\":\\\"^2.1.1\\\",\\\"karma\\\":\\\"^4.1.0\\\",\\\"karma-chai\\\":\\\"^0.1.0\\\",\\\"karma-chrome-launcher\\\":\\\"^2.2.0\\\",\\\"karma-mocha\\\":\\\"^1.3.0\\\",\\\"karma-requirejs\\\":\\\"^1.1.0\\\",\\\"karma-webpack\\\":\\\"^3.0.5\\\",\\\"mocha\\\":\\\"^5.2.0\\\",\\\"nodemon\\\":\\\"^1.18.7\\\",\\\"requirejs\\\":\\\"^2.3.6\\\",\\\"webpack\\\":\\\"^4.26.1\\\",\\\"webpack-cli\\\":\\\"^3.1.2\\\"}}\");\n\n//# sourceURL=webpack://wealthscope-partner-sdk/./package.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: WealthscopeSdk, WealthscopeApiClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WealthscopeSdk\", function() { return WealthscopeSdk; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WealthscopeApiClient\", function() { return WealthscopeApiClient; });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _require = __webpack_require__(/*! ../package.json */ \"./package.json\"),\n    _version = _require.version;\n\nvar urlJoin = __webpack_require__(/*! url-join */ \"./node_modules/url-join/lib/url-join.js\");\n\nvar SDK_READY = 'SDK_READY';\nvar WealthscopeSdk =\n/*#__PURE__*/\nfunction () {\n  function WealthscopeSdk(opts) {\n    _classCallCheck(this, WealthscopeSdk);\n\n    // A queue to hold messages that are to be dispatched\n    this.msgQueue = []; // Flag which signifies whether the iFrame is ready\n\n    this.isReady = false; // Flag which signifies if the SDK has been initiated\n\n    this.isInit = false; // A timeout which holds the next dequeue attempt\n\n    this.nextDequeueAttempt = null; // User options\n\n    this.opts = Object.assign({\n      // place defaults here\n      wealthscopeUrl: 'https://bus.wealthscope.ca',\n      width: '100%',\n      height: '100%'\n    }, opts);\n  }\n\n  _createClass(WealthscopeSdk, [{\n    key: \"render\",\n    value: function render(element) {\n      var _this = this;\n\n      return new Promise(function (resolve) {\n        _this.element = element;\n        var iframe = document.createElement('iframe');\n        iframe.src = _this.opts.wealthscopeUrl;\n        iframe.width = _this.opts.width;\n        iframe.height = _this.opts.height;\n        element.appendChild(iframe);\n        _this.iframe = iframe;\n\n        if (!_this.isInit) {\n          window.addEventListener('message', function (msg) {\n            var data = msg.data;\n            var type = data.type;\n\n            if (type === SDK_READY) {\n              _this.isReady = true;\n              return resolve();\n            }\n          }); // Signify that the SDK has been initialized\n\n          _this.isInit = true;\n        }\n      });\n    } // This will load the SDK with the extra step of resetting it if already\n    // loaded.\n    // NOTE: When it's reset, you will have to log back in.\n\n  }, {\n    key: \"load\",\n    value: function load(element) {\n      if (this.isReady) {\n        this.logout();\n        this.isReady = false;\n      }\n\n      if (this.element) {\n        this.element.innerHTML = ''; // Clear previous element\n      }\n\n      return this.render(element);\n    }\n  }, {\n    key: \"login\",\n    value: function login(jwtData) {\n      var message = {\n        type: 'auth',\n        token: jwtData\n      };\n\n      this._enqueue(message);\n    }\n  }, {\n    key: \"logout\",\n    value: function logout() {\n      var message = {\n        type: 'logout'\n      };\n\n      this._enqueue(message);\n    } // Add a message to the queue\n\n  }, {\n    key: \"_enqueue\",\n    value: function _enqueue(message) {\n      this.msgQueue.push(message);\n\n      this._dequeue(); // Attempt to dequeue the message\n\n    } // Attempt to dequeue the entire queue of messages\n\n  }, {\n    key: \"_dequeue\",\n    value: function _dequeue() {\n      var _this2 = this;\n\n      // Clear the current task, if there is one\n      clearTimeout(this.nextDequeueAttempt);\n      this.nextDequeueAttempt = null;\n\n      if (this.msgQueue.length <= 0) {\n        return;\n      }\n\n      if (this.isReady) {\n        // Dequeue the queue if the iFrame is ready\n        var contentWindow = this.iframe.contentWindow;\n\n        while (this.msgQueue.length > 0) {\n          var message = this.msgQueue.shift();\n          contentWindow.postMessage(message, this.opts.wealthscopeUrl);\n        }\n      } else {\n        // Set a timeout to attempt again in 250ms\n        if (!this.nextDequeueAttempt) {\n          this.nextDequeueAttempt = setTimeout(function () {\n            return _this2._dequeue();\n          }, 250);\n        }\n      }\n    }\n  }], [{\n    key: \"version\",\n    value: function version() {\n      return _version;\n    }\n  }]);\n\n  return WealthscopeSdk;\n}();\nvar WealthscopeApiClient =\n/*#__PURE__*/\nfunction () {\n  /**\n   * Constructor for the Wealthscope Client API.\n   * Initializes authorization token for the current session to null, and the\n   * base URL.\n   * @param {object} opts options object.\n   */\n  function WealthscopeApiClient(opts) {\n    _classCallCheck(this, WealthscopeApiClient);\n\n    this.token = null;\n    this.opts = Object.assign({\n      wealthscopeUrl: 'https://api.bus.wealthscope.ca/v1'\n    }, opts);\n  }\n  /**\n   * Function that returns the current version from the package.json.\n   * @return {string} the current version of the package\n   */\n\n\n  _createClass(WealthscopeApiClient, [{\n    key: \"login\",\n\n    /**\n     * This generates an Authentication token and sets this.token to the\n     * generated token.\n     * @param {string} jwtData The login payload for your user.\n     * @return {Promise<Response>}\n     */\n    value: function login(jwtData) {\n      var _this3 = this;\n\n      return fetch(this._constructUrl('/auth/authenticate/'), {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify({\n          token: jwtData\n        })\n      }).then(\n      /*#__PURE__*/\n      function () {\n        var _ref = _asyncToGenerator(\n        /*#__PURE__*/\n        regeneratorRuntime.mark(function _callee(response) {\n          var json;\n          return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  _context.next = 2;\n                  return response.json();\n\n                case 2:\n                  json = _context.sent;\n                  _this3.token = json.token;\n                  return _context.abrupt(\"return\", response);\n\n                case 5:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee);\n        }));\n\n        return function (_x) {\n          return _ref.apply(this, arguments);\n        };\n      }());\n    }\n    /**\n     * This simply resets the token to null. No API call is actually made.\n     * @return {Promise}\n     */\n\n  }, {\n    key: \"logout\",\n    value: function logout() {\n      this.token = null;\n      return Promise.resolve();\n    }\n    /**\n     * This is an HTTP call using the GET method.  It requires a URL.\n     * Login must also succesfully be called before calling this method.\n     * @param {string} url The URL of the desired Wealthscope endpoint\n     * @return {Promise<Response>}\n     */\n\n  }, {\n    key: \"get\",\n    value: function get(url) {\n      return this._doFetch(url, 'GET');\n    }\n    /**\n     * This is an HTTP call using the PUT method.  It requires a URL and a body.\n     * Login must also succesfully be called before calling this method.\n     * NOTE: Body needs to be a JSON object here, it gets stringified when it is\n     * added to the options object for the fetch.\n     * @param {string} url The URL of the desired Wealthscope endpoint\n     * @param {object} body The json object that is the payload for the call\n     * @return {Promise<Response>}\n     */\n\n  }, {\n    key: \"put\",\n    value: function put(url, body) {\n      return this._doFetch(url, 'PUT', body);\n    }\n    /**\n     * This is an HTTP call using the POST method.  It requires a URL and a body.\n     * Login must also succesfully be called before calling this method.\n     * NOTE: Body needs to be a JSON object here, it gets stringified when it is\n     * added to the options object for the fetch.\n     * @param {string} url The URL of the desired Wealthscope endpoint\n     * @param {object} body The json object that is the payload for the call\n     * @return {Promise<Response>}\n     */\n\n  }, {\n    key: \"post\",\n    value: function post(url, body) {\n      return this._doFetch(url, 'POST', body);\n    }\n    /**\n     * This is an HTTP call using the DELETE method. It requires a URL and a body\n     * Login must also succesfully be called before calling this method.\n     * NOTE: Body needs to be a JSON object here, it gets stringified when it is\n     * added to the options object for the fetch.\n     * @param {string} url The URL of the desired Wealthscope endpoint\n     * @param {object} body The json object that is the payload for the call\n     * @return {Promise<Response>}\n     */\n\n  }, {\n    key: \"del\",\n    value: function del(url, body) {\n      return this._doFetch(url, 'DELETE', body);\n    }\n    /**\n     * @private\n     * Generates a URL based on options.wealthscopeUrl, and ensures a trailing '/'\n     * @param {string} url The URL of the desired Wealthscope endpoint\n     * @return {string} A fully constructed URL\n     */\n\n  }, {\n    key: \"_constructUrl\",\n    value: function _constructUrl(url) {\n      // trailing slash is important in order for `fetch` to work with the Django\n      // backend.\n      return urlJoin(this.opts.wealthscopeUrl, url) + '/';\n    }\n    /**\n     * @private\n     * This function constructs the options object that will be used by the\n     * various fetch calls below.\n     * NOTE: method must be in ALL CAPS, body must be a json object\n     * @param {string} method The HTTP method for the fetch call (GET, PUT...)\n     * @param {object} body The json object that is the payload for the call\n     * @return {object}\n     */\n\n  }, {\n    key: \"_getFetchOptions\",\n    value: function _getFetchOptions(method, body) {\n      // An options object with empty headers\n      var fetchOption = {\n        headers: {}\n      }; // The Method portion of the object\n\n      fetchOption.method = method; // A check to make sure token is present before adding it to the options\n      // return an error if token isn't present\n\n      if (this.token !== null) {\n        fetchOption.headers.Authorization = 'JWT ' + this.token;\n      } else {\n        throw new Error('You must be logged in to perform this action.');\n      } // A check for a body before it's added to the options, allows the same\n      // construction functon to be used for calls without a body component\n      // Returns the object without the body if body is empty, adds the body to\n      // the object if it's present\n\n\n      if (body) {\n        fetchOption.headers['Content-Type'] = 'application/json';\n        fetchOption.body = JSON.stringify(body);\n      }\n\n      return fetchOption;\n    }\n    /**\n     * @private\n     * This function handles fetch calls by being passed parameters from each\n     * of GET, PUT, POST, and DELETE\n     * @param {string} url The URL of the desired Wealthscope endpoint\n     * @param {string} method The HTTP method (GET, PUT, POST, or DELETE)\n     * @param {object} body The json object that is the payload for the call\n     * @return {Promise<Response>}\n     */\n\n  }, {\n    key: \"_doFetch\",\n    value: function _doFetch(url, method, body) {\n      var options = this._getFetchOptions(method, body);\n\n      return fetch(this._constructUrl(url), options)[\"catch\"](function (err) {\n        return console.error(err);\n      });\n    }\n  }], [{\n    key: \"version\",\n    value: function version() {\n      return _version;\n    }\n  }]);\n\n  return WealthscopeApiClient;\n}();\n\n//# sourceURL=webpack://wealthscope-partner-sdk/./src/index.js?");

/***/ })

/******/ });
});