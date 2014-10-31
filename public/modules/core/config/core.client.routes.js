'use strict';

angular.module('core', ['ngCookies', 'akoenig.deckgrid', 'angular-inview']).config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('content', {
			url: '/{thread_id:[0-9]{13}}',
			templateUrl: 'modules/core/views/content.client.view.html'
		}).
		state('privacy', {
			url: '/privacy',
			templateUrl: 'modules/core/views/privacy.client.view.html'
		}).
		state('cms', {
			url: '/cms',
			templateUrl: 'modules/core/views/cms.client.view.html'
		}).
		state('cms_list', {
			url: '/cms_list',
			templateUrl: 'modules/core/views/cms_list.client.view.html'
		}).
		state('cms_insert', {
			url: '/cms_insert',
			templateUrl: 'modules/core/views/cms_insert.client.view.html'
		});
	}
]);
