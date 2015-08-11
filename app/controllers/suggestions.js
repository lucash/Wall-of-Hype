var Suggestion = require('../models/suggestions'),
    settingsController = require('./settings'),
    rest = require('restler');

var SuggestionsController = {
    createPollFromSuggestions: function (callback) {
        this.getSuggestions(function(cb){
            var options = [];
            for(game in cb){
                options.push(cb[game].title);
            }
            rest.post("http://strawpoll.me/api/v2/polls", {
                data: {
                    "title": "Welche Spiele sollen auf der Wall of Hype erscheinen?",
                    "options": options,
                    "multi": true,
                    "permissive": true
                }
            }).on('complete', function (data, response) {
                settingsController.setPollId(data.id);
                callback(data);
            });
        });
    },
    addSuggestion: function (data) {
        console.log('adding suggestion...');
        var suggestion = new Suggestion({
            title: data.game
        });

        suggestion.save(function (err) {
            if (err) throw err;

            console.log('saved suggestion');
        });
    },
    resetSuggestions: function (callback) {
        console.log('resetting suggestions...');
        Suggestion.remove({}, function (err) {
            console.log('collection dropped');
            callback();
        });

    },
    getSuggestions: function (callback) {
        console.log('retrieving suggestions...');
        Suggestion.find(function (err, suggestions) {
            if (err) return callback({error: 'Something went horribly wrong'});

            callback(suggestions);
        });
    }
};

module.exports = SuggestionsController;