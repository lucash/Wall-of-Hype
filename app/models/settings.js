var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var settingsSchema = new Schema({
    /*
    name: String,
    value: String
    */
    name: String,
    votingOpen: Boolean,
    pollId: String
});

var Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;