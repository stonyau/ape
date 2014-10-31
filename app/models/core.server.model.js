'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ThreadSchema = new Schema({
	thread_id: {
		type: Number,
		index: true
	},
	title: {
		type: String,
		default: '',
		required: 'Title cannot be blank',
		index: false
	},
	url: {
		type: String,
		default: '',
		index: false
	},
	status: {
		type: Number,
		default: 10,
		index: false
	}
}, {collection: 'threads'});

mongoose.model('Thread', ThreadSchema);