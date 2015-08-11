var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var suggestionsSchema = new Schema({
    title: String
});

var Suggestion = mongoose.model('Suggestions', suggestionsSchema);

module.exports = Suggestion;