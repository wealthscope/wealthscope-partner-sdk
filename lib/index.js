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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/gerald/Dev/wealthscope-partner-sdk/src/index.js: Unexpected token, expected \\\",\\\" (6:46)\\n\\n\\u001b[0m \\u001b[90m 4 | \\u001b[39m\\u001b[36mconst\\u001b[39m \\u001b[33mSDK_READY\\u001b[39m \\u001b[33m=\\u001b[39m \\u001b[32m'SDK_READY'\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 5 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 6 | \\u001b[39mlet iframes \\u001b[33m=\\u001b[39m iFrameResize( [{options}]\\u001b[33m,\\u001b[39m [css selector] \\u001b[33m||\\u001b[39m [iframe] )\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m   | \\u001b[39m                                              \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 7 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 8 | \\u001b[39m\\u001b[36mexport\\u001b[39m \\u001b[36mclass\\u001b[39m \\u001b[33mWealthscopeSdk\\u001b[39m {\\u001b[0m\\n\\u001b[0m \\u001b[90m 9 | \\u001b[39m  constructor(opts) {\\u001b[0m\\n    at Parser.raise (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:4028:15)\\n    at Parser.unexpected (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5359:16)\\n    at Parser.expect (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5347:28)\\n    at Parser.parseExprList (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:7175:14)\\n    at Parser.parseExprAtom (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6455:30)\\n    at Parser.parseExprSubscripts (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6081:21)\\n    at Parser.parseMaybeUnary (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6060:21)\\n    at Parser.parseExprOps (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5945:21)\\n    at Parser.parseMaybeConditional (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5917:21)\\n    at Parser.parseMaybeAssign (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5864:21)\\n    at Parser.parseExprListItem (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:7199:18)\\n    at Parser.parseCallExpressionArguments (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6289:22)\\n    at Parser.parseSubscript (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6191:32)\\n    at Parser.parseSubscripts (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6101:19)\\n    at Parser.parseExprSubscripts (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6091:17)\\n    at Parser.parseMaybeUnary (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:6060:21)\\n    at Parser.parseExprOps (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5945:21)\\n    at Parser.parseMaybeConditional (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5917:21)\\n    at Parser.parseMaybeAssign (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:5864:21)\\n    at Parser.parseVar (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:8123:26)\\n    at Parser.parseVarStatement (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:7937:10)\\n    at Parser.parseStatementContent (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:7528:21)\\n    at Parser.parseStatement (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:7478:17)\\n    at Parser.parseBlockOrModuleBlockBody (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:8046:23)\\n    at Parser.parseBlockBody (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:8033:10)\\n    at Parser.parseTopLevel (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:7443:10)\\n    at Parser.parse (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:8876:17)\\n    at parse (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/parser/lib/index.js:10907:38)\\n    at parser (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/core/lib/transformation/normalize-file.js:170:34)\\n    at normalizeFile (/Users/gerald/Dev/wealthscope-partner-sdk/node_modules/@babel/core/lib/transformation/normalize-file.js:138:11)\");\n\n//# sourceURL=webpack://wealthscope-partner-sdk/./src/index.js?");

/***/ })

/******/ });
});