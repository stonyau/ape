'use strict';

// Setting up route
angular.module('core', ['ngCookies']).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('privacy', {
			url: '/privacy',
			templateUrl: 'modules/core/views/privacy.client.view.html'
		}).
		state('cms', {
			url: '/cms',
			templateUrl: 'modules/core/views/cms.client.view.html'
		}).
		state('cms_insert', {
			url: '/cms_insert',
			templateUrl: 'modules/core/views/cms_insert.client.view.html'
		});
	}
]);