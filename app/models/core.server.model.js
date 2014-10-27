'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ThreadSchema = new Schema({
	thread_id: {
		type: Number,
		default: Date.now()
	},
	title: {
		type: String,
		default: '',
		required: 'Title cannot be blank'
	},
	url: {
		type: String,
		default: ''
	},
	status: {
		type: Number,
		default: 10
	}
}, {collection: 'threads'});

mongoose.model('Thread', ThreadSchema);