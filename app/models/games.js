var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gamesSchema = new Schema({
    title: String,
    description: String,
    developer: String,
    publisher: String,
    homepage: String,
    coverart: String,
    trailerID: String,
    official: Boolean,
    community: Boolean,
    active: Boolean,
    released: Boolean,
    releasedate: String,
    platforms: Array,
    new: Boolean
});

var Game = mongoose.model('Games', gamesSchema);

module.exports = Game;