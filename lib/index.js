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

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, main, license, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"wealthscope-partner-sdk\",\"version\":\"0.0.5\",\"main\":\"lib/index.js\",\"license\":\"MIT\",\"scripts\":{\"test\":\"karma start --single-run --browsers ChromeHeadless karma.conf.js\",\"build\":\"webpack\"},\"dependencies\":{},\"devDependencies\":{\"@babel/core\":\"^7.1.6\",\"@babel/preset-env\":\"^7.1.6\",\"babel-core\":\"^6.26.3\",\"chai\":\"^4.2.0\",\"eslint\":\"^5.9.0\",\"eslint-config-google\":\"^0.11.0\",\"karma\":\"^3.1.1\",\"karma-chai\":\"^0.1.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-mocha\":\"^1.3.0\",\"karma-requirejs\":\"^1.1.0\",\"karma-webpack\":\"^3.0.5\",\"mocha\":\"^5.2.0\",\"nodemon\":\"^1.18.7\",\"requirejs\":\"^2.3.6\",\"webpack-cli\":\"^3.1.2\",\"babel-loader\":\"^8.0.4\",\"eslint-loader\":\"^2.1.1\",\"webpack\":\"^4.26.1\"}};\n\n//# sourceURL=webpack://wealthscope-partner-sdk/./package.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: WealthscopeSdk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WealthscopeSdk\", function() { return WealthscopeSdk; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar _require = __webpack_require__(/*! ../package.json */ \"./package.json\"),\n    _version = _require.version; // class WsInitializationError extends Error {}\n// function requirePresence(options, property) {\n//   if (!options || !options[property]) {\n//     throw new WsInitializationError(`Option ${property} is mandatory`);\n//   }\n// }\n\n\nvar SDK_READY = 'SDK_READY';\nvar WealthscopeSdk =\n/*#__PURE__*/\nfunction () {\n  function WealthscopeSdk(opts) {\n    _classCallCheck(this, WealthscopeSdk);\n\n    // A queue to hold messages that are to be dispatched\n    this.msgQueue = []; // Flag which signifies whether the iFrame is ready\n\n    this.isReady = false; // Flag which signifies if the SDK has been initiated\n\n    this.isInit = false; // A timeout which holds the next dequeue attempt\n\n    this.nextDequeueAttempt = null; // User options\n\n    this.opts = Object.assign({\n      // place defaults here\n      wealthscopeUrl: 'https://bus.wealthscope.ca',\n      width: '100%',\n      height: '100%'\n    }, opts);\n  }\n\n  _createClass(WealthscopeSdk, [{\n    key: \"render\",\n    value: function render(element) {\n      var _this = this;\n\n      return new Promise(function (resolve) {\n        _this.element = element;\n        var iframe = document.createElement('iframe');\n        iframe.src = _this.opts.wealthscopeUrl;\n        iframe.width = _this.opts.width;\n        iframe.height = _this.opts.height;\n        element.appendChild(iframe);\n        _this.iframe = iframe;\n\n        if (!_this.isInit) {\n          window.addEventListener('message', function (msg) {\n            var data = msg.data;\n            var type = data.type;\n\n            if (type === SDK_READY) {\n              _this.isReady = true;\n              return resolve();\n            }\n          }); // Signify that the SDK has been initialized\n\n          _this.isInit = true;\n        }\n      });\n    }\n  }, {\n    key: \"load\",\n    value: function load(element) {\n      if (this.isReady) {\n        this.logout();\n        this.isReady = false;\n      }\n\n      if (this.element) {\n        this.element.innerHTML = ''; // Clear previous element\n      }\n\n      return this.render(element);\n    }\n  }, {\n    key: \"login\",\n    value: function login(jwtData) {\n      var message = {\n        type: 'auth',\n        token: jwtData\n      };\n\n      this._enqueue(message);\n    }\n  }, {\n    key: \"logout\",\n    value: function logout() {\n      var message = {\n        type: 'logout'\n      };\n\n      this._enqueue(message);\n    } // Add a message to the queue\n\n  }, {\n    key: \"_enqueue\",\n    value: function _enqueue(message) {\n      this.msgQueue.push(message);\n\n      this._dequeue(); // Attempt to dequeue the message\n\n    } // Attempt to dequeue the entire queue of messages\n\n  }, {\n    key: \"_dequeue\",\n    value: function _dequeue() {\n      var _this2 = this;\n\n      // Clear the current task, if there is one\n      clearTimeout(this.nextDequeueAttempt);\n      this.nextDequeueAttempt = null;\n\n      if (this.msgQueue.length <= 0) {\n        return;\n      }\n\n      if (this.isReady) {\n        // Dequeue the queue if the iFrame is ready\n        var contentWindow = this.iframe.contentWindow;\n\n        while (this.msgQueue.length > 0) {\n          var message = this.msgQueue.shift();\n          contentWindow.postMessage(message, this.opts.wealthscopeUrl);\n        }\n      } else {\n        // Set a timeout to attempt again in 250ms\n        if (!this.nextDequeueAttempt) {\n          this.nextDequeueAttempt = setTimeout(function () {\n            return _this2._dequeue();\n          }, 250);\n        }\n      }\n    }\n  }], [{\n    key: \"version\",\n    value: function version() {\n      return _version;\n    }\n  }]);\n\n  return WealthscopeSdk;\n}();\n\n//# sourceURL=webpack://wealthscope-partner-sdk/./src/index.js?");

/***/ })

/******/ });
});