var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var optionSchema = new Schema({
    title: String,
    votes: Number
});

var pollsSchema = new Schema({
    title: String,
    number: Number,
    active: Boolean,
    totalVotes: Number,
    options: [optionSchema]
});

var Poll = mongoose.model('Polls', pollsSchema);

module.exports = Poll;