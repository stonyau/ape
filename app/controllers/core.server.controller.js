'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Thread = mongoose.model('Thread'),
	_ = require('lodash');
 
exports.correct_password = 'EaXbaDrMNWUqM54kTuVCY82K83bkGu5pXtgcnWpKujmHNkmJrq';

exports.getIndex = function(req, res) {
	res.render('index', {
		temp:  null
	});
};

exports.getContent = function(req, res) {
	if(req.param('next_content') > 0) {
		Thread.find({thread_id: {$lt: req.param('thread_id')}}).limit(-1).exec(function(err, thread) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(thread[0]);
			}
		});
	} else {
		Thread.find({thread_id: req.param('thread_id')}).exec(function(err, thread) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(thread[0]);
			}
		});
	}
};

exports.CMSLogin = function(req, res) {
	if(!exports.checkCMSToken(req.body.password)) {
		res.jsonp(1);
		return;
	}
	res.jsonp(10);
};

exports.CMSInsert = function(req, res) {
	if(!exports.checkCMSToken(req.cookies.cms_token)) {
		res.jsonp(1);
		return;
	}
	
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

exports.CMSList = function(req, res) {
	if(!exports.checkCMSToken(req.cookies.cms_token)) {
		res.jsonp(1);
		return;
	}
	
	Thread.find().sort('-thread_id').limit(30).exec(function(err, threads) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(threads);
		}
	});
};

exports.CMSDelete = function(req, res) {
	if(!exports.checkCMSToken(req.cookies.cms_token)) {
		res.jsonp(1);
		return;
	}
	/*
	Thread.update({thread_id:req.params.thread_id},{status:20}).exec(function(err, threads) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(10);
		}
	});
	*/
	Thread.find({thread_id:req.params.thread_id}).remove().exec(function(err, threads) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(10);
		}
	});
};

exports.checkCMSToken = function(cms_token) {
	if(typeof cms_token === 'undefined' || cms_token !== exports.correct_password) {
		return false;
	}
	return true;
};