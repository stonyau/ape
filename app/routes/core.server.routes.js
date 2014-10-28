'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.route('/').get(core.getIndex);
	app.route('/cms_login').post(core.CMSLogin);
	
	app.route('/threads').get(core.CMSList);
	app.route('/threads').post(core.CMSInsert);
	
	app.route('/threads/:thread_id').get(core.getContent);
	app.route('/threads/:thread_id').delete(core.CMSDelete);
};