var Suggestion = require('../models/suggestions'),
    Poll = require('../models/polls'),
    settingsController = require('./settings'),
    rest = require('restler');

var SuggestionsController = {
    createPollFromSuggestions: function (callback) {
        /*
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
        */
        this.getSuggestions(function(suggestions) {
            var options = [];
            for(game in suggestions){
                options.push({title:suggestions[game].title,votes:0})
            }

            var poll = new Poll({
                title: "Wähle Deine Favoriten!",
                number: 1,
                active: true,
                totalVotes: 0,
                options: options
            });

            poll.save(function (err) {
                if (err) throw err;

                console.log('saved poll');
                settingsController.setPollId(poll._id);
                console.log('updated id');
            });
            callback();
        })
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
    removeSuggestion: function (id){
        console.log('deleting suggestion...');
        Suggestion.remove({_id:id}, function (err) {
            if(!err){
                console.log("success!");
            }else{
                console.log("err!");
            }
            callback();
        })
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
