'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Thread',
	function($scope, Thread) {
		$scope.threads = [];
		$scope.content_factor = 9;
		$scope.start_limit = 0;
		$scope.no_more_content = false;
		
		$scope.loadContent = function() {
			if(!$scope.no_more_content) {
				Thread.query({
					start_limit: $scope.start_limit
				}, function(result) {console.log(result.length);
					if(result.length < $scope.content_factor) {
						$scope.no_more_content = true;
					} else {
						$scope.start_limit += $scope.content_factor;
					}
					$scope.threads.push.apply($scope.threads, result);
				});
			}
		};
	}
]);

angular.module('core').controller('ContentController', ['$scope', '$stateParams', '$location', 'Thread',
	function($scope, $stateParams, $location, Thread) {
		$scope.getContent = function() {
			$scope.thread = Thread.get({
				thread_id: $stateParams.thread_id
			});
		};
		$scope.nextContent = function(_thread_id) {
			$scope.next_content = 1;
			$scope.thread = Thread.get({
				thread_id: _thread_id,
				next_content: 1
			});
		};
	}
]);

angular.module('core').controller('CMSController', ['$scope', '$http', '$cookies', '$filter', '$location', 'Thread',
	function($scope, $http, $cookies, $filter, $location, Thread) {
		$scope.login = function() {
			$http.post('/cms_login', $scope.form_data).success(function(response) {
				if(response !== '1') {
					$cookies.cms_token = $scope.form_data.password;
					$location.path('/cms_list');
				}
			});
		};
		$scope.insert = function() {
			var thread = new Thread({
				title: this.title,
				url: this.url,
				thread_id: Date.now()
			});
			thread.$save(function(response) {
				$location.path('/cms_list');
			}, function(errorResponse) {
				alert('系統錯誤: '+errorResponse);
			});
		};
		$scope.list = function() {
			$scope.threads = Thread.query();
		};
		$scope.delete = function(int) {
			Thread.delete({thread_id:int});
		};
		$scope.logout = function(int) {
			$cookies.cms_token = '';
			$location.path('/cms');
		};
	}
]);