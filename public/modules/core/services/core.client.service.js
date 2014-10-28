'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('core').factory('Thread', ['$resource',
	function($resource) {
		return $resource('threads/:thread_id');
	}
]);