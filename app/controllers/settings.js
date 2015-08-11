var Settings = require('../models/settings');

var SettingsController = {
    isVotingOpen: function (callback) {
        Settings.findOne({name: 'primarySettings'}, function (err, obj) {
            if (err) return handleError(err);
            callback(obj.votingOpen);
        });
    },
    togglePoll: function (callback) {
        Settings.findOne({name: 'primarySettings'}, function (err, obj) {
            if (err) return handleError(err);
            //var val = JSON.parse(obj.value);
            if (obj.votingOpen)
                val = false;
            else
                val = true;

            obj.votingOpen = val;
            console.log("Poll is now " + val);

            obj.save(function (err) {
                if (err) return handleError(err);
                callback(val);
            });

        });
    },
    setPollId: function (id) {
        Settings.findOne({name: 'primarySettings'}, function (err, obj) {
            if (err) return handleError(err);
            obj.pollId = id;

            obj.save(function (err) {
                if (err) return handleError(err);
            });
        });
    },
    getPollId: function (callback) {
        Settings.findOne({name: 'primarySettings'}, function (err, obj) {
            if (err) return handleError(err);
            callback(obj.pollId);
        });
    }
};

module.exports = SettingsController;