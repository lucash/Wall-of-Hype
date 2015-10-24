var Poll = require('../models/polls');

var PollsController = {
    getPoll: function(id, callback) {
        Poll.findById(id, function (err, poll) {
            if (err) return callback({error: 'Something went horribly wrong'});

            console.log(poll);
            callback(poll);
        })
    },
    addVote: function(data){
        console.log('adding votes...');
        Poll.findById(data.pollId, function (err, poll){
            for(vote in data.v) {
                for (option in poll.options) {
                    if (data.v[vote] == poll.options[option]._id){
                        poll.options[option].votes += 1;
                        poll.totalVotes += 1;
                    }

                }
            }

            poll.save(function (err) {
                if (err) throw err;

                console.log('saved votes');
            })
        })
    }
};

module.exports = PollsController;