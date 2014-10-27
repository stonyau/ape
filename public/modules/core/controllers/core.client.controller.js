'use strict';

angular.module('core').controller('HomeController', ['$scope',
	function($scope) {
	}
]);

angular.module('core').controller('CMSController', ['$scope', '$http', '$cookies', '$location', 'Thread',
	function($scope, $http, $cookies, $location, Thread) {
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
				url: this.url
			});
			thread.$save(function(response) {
				location.reload();
			}, function(errorResponse) {
				alert('系統錯誤: '+errorResponse);
			});
		};
		$scope.find = function() {
			$scope.thread = Thread.query();
		};
	}
]);