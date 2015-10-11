var rest = require('connect-rest'),
    asynch = require('async'),
    gamesController = require('./controllers/games'),
    suggestionsController = require('./controllers/suggestions'),
    settingsController = require('./controllers/settings');

var options = {
    context: '/api',
    domain: require('domain').create()
};

module.exports = function (app, passport) {
    app.use(rest.rester(options));

    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', function (req, res) {
        gamesController.getAllOfficialGames(function (cb) {
            cb.sort(function () {
                return .5 - Math.random();
            });
            res.render('index', {games: cb});
        });
    });

    // =====================================
    // IMPRINT ===========================
    // =====================================
    app.get('/imprint', function (req, res) {
        res.render('imprint');
    });
    app.get('/datenschutz', function (req, res) {
        res.render('datenschutz');
    });

    // =====================================
    // COMMUNITY ===========================
    // =====================================
    app.get('/community', function (req, res) {
        asynch.parallel([
            function (callback) {
                settingsController.isVotingOpen(function (cb) {
                    isVotingOpen = cb;
                    callback(null, cb);
                })
            },
            function (callback) {
                gamesController.getAllCommunityGames(function (cb) {
                    cb.sort(function () {
                        return .5 - Math.random();
                    });
                    games = cb;
                    callback(null, cb);
                })
            },
            function (callback) {
                settingsController.getPollId(function (cb) {
                    callback(null, cb);
                })
            }
        ], function (err, results) {
            res.render('community', {
                voting: results[0],
                games: results[1],
                pollId: results[2]
            });
        });
    });

    app.post('/suggest', function (req, res) {
        suggestionsController.addSuggestion(req.body);
        res.render('thanks');
    });

    app.get('/voting', function (req, res) {
        asynch.parallel([
            function (callback) {
                settingsController.isVotingOpen(function (cb) {
                    isVotingOpen = cb;
                    callback(null, cb);
                })
            },
            function (callback) {
                settingsController.getPollId(function (cb) {
                    callback(null, cb);
                })
            }
        ], function (err, results) {
            res.render('voting', {
                voting: results[0],
                pollId: results[1]
            });
        });
    });

    // =====================================
    // RELEASED=============================
    // =====================================
    app.get('/released', function (req, res) {
        gamesController.getAllReleasedGames(function (cb) {
            res.render('released', {games: cb});
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function (req, res) {
        res.render('login', {message: req.flash('loginMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // =====================================
    // SIGNUP //DISABLED//==================
    // =====================================
    // show the signup form
    /*
     app.get('/signup', function (req, res) {

     // render the page and pass in any flash data if it exists
     res.render('signup', {message: req.flash('signupMessage')});
     });
     */
    // process the signup form
    /*
     app.post('/signup', passport.authenticate('local-signup', {
     successRedirect: '/admin',
     failureRedirect: '/signup',
     failureFlash: true
     }));
     */

    // =====================================
    // ADMIN SECTION =======================
    // =====================================
    app.get('/admin' , isLoggedIn , function (req, res) {
        asynch.parallel([
            function (callback) {
                suggestionsController.getSuggestions(function (cb) {
                    callback(null, cb);
                })
            },
            function (callback) {
                gamesController.getAllGames(function (cb) {
                    callback(null, cb);
                })
            },
            function (callback) {
                settingsController.getPollId(function (cb) {
                    callback(null, cb);
                })
            }
        ], function (err, results) {
            res.render('admin', {
                user: req.user,
                suggestions: results[0],
                games: results[1],
                pollId: results[2]
            });
        });
    });

    app.get('/new', isLoggedIn,  function (req, res) {
        res.render('new');
    });

    app.get('/togglepoll', isLoggedIn, function (req, res) {
        settingsController.togglePoll(function () {
            res.redirect('/admin');
        })
    });

    app.get('/createpoll', isLoggedIn, function (req, res) {
        suggestionsController.createPollFromSuggestions(function (cb) {
            res.redirect('/admin');
        });
    });

    app.get('/reset', isLoggedIn, function (req, res) {
        suggestionsController.resetSuggestions(function () {
            res.redirect('/admin');
        })
    });

    app.get('/edit/:id', isLoggedIn, function (req, res) {
        gamesController.getGame(req.params.id, function (cb) {
            res.render('edit', {
                game: cb
            });
        });
    });

    app.get('/createhistory', isLoggedIn, function(req, res) {
       res.render('createhistory');
    });

    app.post('/create', isLoggedIn, function (req, res) {
        gamesController.addGame(req.body);
        res.redirect('/admin');
    });
    app.post('/save', isLoggedIn, function (req, res) {
        gamesController.editGame(req.body);
        res.redirect('/admin');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // API =================================
    // =====================================
    rest.get('/games/official', function (req, content, cb) {
        gamesController.getAllOfficialGames(function (games) {
            cb(null, games.map(function (g) {
                return {
                    id: g._id,
                    title: g.title,
                    description: g.description,
                    developer: g.developer,
                    publisher: g.publisher,
                    homepage: g.homepage,
                    coverart: g.coverart,
                    trailerID: g.trailerID,
                    official: g.official,
                    community: g.community,
                    active: g.active,
                    releasedate: g.releasedate,
                    platforms: g.platforms,
                    released: g.released
                }
            }));
        })
    });

    rest.get('/games/all', function (req, content, cb) {
        gamesController.getAllGames(function (games) {
            cb(null, games.map(function (g) {
                return {
                    id: g._id,
                    title: g.title,
                    description: g.description,
                    developer: g.developer,
                    publisher: g.publisher,
                    homepage: g.homepage,
                    coverart: g.coverart,
                    trailerID: g.trailerID,
                    official: g.official,
                    community: g.community,
                    active: g.active,
                    releasedate: g.releasedate,
                    platforms: g.platforms,
                    released: g.released
                }
            }));
        })
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
