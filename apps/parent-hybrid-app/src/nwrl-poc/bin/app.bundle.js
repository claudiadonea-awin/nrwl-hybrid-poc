/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	import angular from 'angular';
	import uirouter from 'angular-ui-router';
	
	import routes from './app.routes';
	import commissionRules from './commission-rules';
	
	angular.bootstrap(document.body, ['nwrl-poc'], { strictDi: true });
	
	angular.module('nwrl-poc', [uirouter, commissionRules]).config(routes);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODNiY2Y1ZmEzNGY5MzljZGNmNjYiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5tb2R1bGUuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsInVpcm91dGVyIiwicm91dGVzIiwiY29tbWlzc2lvblJ1bGVzIiwiYm9vdHN0cmFwIiwiZG9jdW1lbnQiLCJib2R5Iiwic3RyaWN0RGkiLCJtb2R1bGUiLCJjb25maWciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBLFFBQU9BLE9BQVAsTUFBb0IsU0FBcEI7QUFDQSxRQUFPQyxRQUFQLE1BQXFCLG1CQUFyQjs7QUFFQSxRQUFPQyxNQUFQLE1BQW1CLGNBQW5CO0FBQ0EsUUFBT0MsZUFBUCxNQUE0QixvQkFBNUI7O0FBRUFILFNBQVFJLFNBQVIsQ0FBa0JDLFNBQVNDLElBQTNCLEVBQWlDLENBQUMsVUFBRCxDQUFqQyxFQUErQyxFQUFFQyxVQUFVLElBQVosRUFBL0M7O0FBRUFQLFNBQVFRLE1BQVIsQ0FBZSxVQUFmLEVBQTJCLENBQUNQLFFBQUQsRUFBV0UsZUFBWCxDQUEzQixFQUNHTSxNQURILENBQ1VQLE1BRFYsRSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODNiY2Y1ZmEzNGY5MzljZGNmNjYiLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xuaW1wb3J0IHVpcm91dGVyIGZyb20gJ2FuZ3VsYXItdWktcm91dGVyJ1xuXG5pbXBvcnQgcm91dGVzIGZyb20gJy4vYXBwLnJvdXRlcydcbmltcG9ydCBjb21taXNzaW9uUnVsZXMgZnJvbSAnLi9jb21taXNzaW9uLXJ1bGVzJztcblxuYW5ndWxhci5ib290c3RyYXAoZG9jdW1lbnQuYm9keSwgWydud3JsLXBvYyddLCB7IHN0cmljdERpOiB0cnVlIH0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnbndybC1wb2MnLCBbdWlyb3V0ZXIsIGNvbW1pc3Npb25SdWxlc10pXG4gIC5jb25maWcocm91dGVzKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2FwcC5tb2R1bGUuanMiXSwic291cmNlUm9vdCI6IiJ9