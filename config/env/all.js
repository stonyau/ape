'use strict';

module.exports = {
	app: {
		title: '搞笑猩猩',
		description: '專注搞笑一百年',
		keywords: '搞笑'
	},
	db: 'mongodb://localhost/mean',
        port: 80,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
