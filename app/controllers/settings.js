var Settings = require('../models/settings');

var SettingsController = {
    isVotingOpen: function (callback) {
        this.getPrimarySettings(function(settings) {
            callback(settings.votingOpen == true);
        });
    },
    togglePoll: function (callback) {
        this.getPrimarySettings(function (obj) {
            //var val = JSON.parse(obj.value);
            obj = obj || new Settings();

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
        this.getPrimarySettings(function (obj) {
            obj = obj || new Settings();
            obj.pollId = id;

            obj.save(function (err) {
                if (err) return handleError(err);
            });
        });
    },
    getPollId: function (callback) {
        this.getPrimarySettings(function (obj) {
            callback(obj.pollId);
        });
    },
    getPrimarySettings: function(callback) {
        Settings.findOne({name: 'primarySettings'}, function (err, obj) {
            if (err) return handleError(err);

            if (!obj) {
                obj = new Settings();
                obj.name = 'primarySettings';
            }

            callback(obj);
        });
    }
};

module.exports = SettingsController;