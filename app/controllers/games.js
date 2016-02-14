var Game = require('../models/games');

var GamesController = {
    addGame: function (data) {
        var platforms = [
            {name: 'Placeholder 1'},
            {name: 'Placeholder 2'}
        ];
        var game = new Game({
            title: data.title,
            description: data.description,
            developer: data.developer,
            publisher: data.publisher,
            homepage: data.homepage,
            coverart: data.coverart,
            trailerID: data.trailerID,
            official: data.official == 'on',
            community: data.community == 'on',
            active: data.active == 'on',
            released: data.released == 'on',
            releasedate: data.releasedate,
            platforms: platforms,
            new: data.new == 'on'
        });

        game.save(function (err) {
            if (err) throw err;

            console.log('saved game');
        });
    },
    editGame: function (data) {
        Game.findById(data._id, function (err, game) {
            game.title = data.title;
            game.description = data.description;
            game.developer = data.developer;
            game.publisher = data.publisher;
            game.homepage = data.homepage;
            game.coverart = data.coverart;
            game.trailerID = data.trailerID;
            game.official = data.official == 'on';
            game.community = data.community == 'on';
            game.active = data.active == 'on';
            game.released = data.released == 'on';
            game.releasedate = data.releasedate;
            game.new = data.new == 'on';

            // platforms..

            game.save(function (err) {
                if (err) return handleError(err);

                console.log('Edited and saved the game');
            });
        });
    },
    getGame: function (id, callback) {
        Game.findById(id, function (err, game) {
            if (err) return callback({error: 'Something went horribly wrong'});

            callback(game);
        });
    },
    getAllGames: function (callback) {
        Game.find({'active': true},function (err, games) {
            if (err) return callback({error: 'Something went horribly wrong'});

            callback(games);
        });
    },
    getAllOfficialGames: function (callback) {
        Game.find({'released' : false, 'official': true, 'active': true}, function (err, games) {
            if (err) return callback({error: 'Something went horribly wrong'});

            callback(games);
        });
    },
    getAllCommunityGames: function (callback) {
        Game.find({'released' : false, 'community': true, 'active': true}, function (err, games) {
            if (err) return callback({error: 'Something went horribly wrong'});

            callback(games);
        });
    },
    getAllReleasedGames: function (callback) {
        Game.find({'released': true, 'active': true}, function (err, games) {
            if (err) return callback({error: 'Something went horribly wrong'});

            callback(games);
        })
    }
};

module.exports = GamesController;