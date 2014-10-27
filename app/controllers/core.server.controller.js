'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Thread = mongoose.model('Thread'),
	_ = require('lodash'),
	cookieParser = require('cookie-parser');
 
exports.correct_password = 'EaXbaDrMNWUqM54kTuVCY82K83bkGu5pXtgcnWpKujmHNkmJrq';

exports.index = function(req, res) {
	res.render('index', {
		temp:  null
	});
};

exports.CMSLogin = function(req, res) {
	exports.checkCMSToken(exports.correct_password, res);
	res.jsonp(10);
};

exports.CMSInsert = function(req, res) {
	//exports.checkCMSToken(cookieParser.JSONCookie('cms_token'), res);
	
	var thread = new Thread(req.body);
	thread.save(function(err) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(10);
		}
	});
};

exports.checkCMSToken = function(cms_token, res) {
	console.log(cms_token);
	if(typeof cms_token === 'undefined' || cms_token !== exports.correct_password) {
		res.jsonp(1);
	}
}