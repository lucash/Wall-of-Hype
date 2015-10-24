$(document).ready(function () {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-53253046-2', 'auto');
    ga('send', 'pageview');

    var curr_id = 0;
    var games;
    var submit = false;

    $.get('/api/games/all', function (data) {
        games = data;
    });

    $('.play, .game, .game_info').on('click', function () {
        var id = $(this).attr('id');
        if ($('#player_container').css('display') === 'none' || id != curr_id) {
            $('#player_container').fadeIn('fast');
            for (var game in games) {
                if (games.hasOwnProperty(game)) {
                    var obj = games[game];
                    if (obj.id == id) {
                        $('#player_title').text(obj.title);
                        $('#player_pun').text(obj.description);
                        $('#player_box').html("<div class='embed-container'><iframe src='https://www.youtube.com/embed/" + obj.trailerID + "' frameborder='0' allowfullscreen></iframe></div>");
                        scrollto("#player_container");
                    }
                }
            }


            curr_id = id;
        } else {
            $('#player_container').fadeOut('fast');
        }
    });

    function captcha_filled() {
        console.log('captcha filled');
        submit = true;
    }

    function captcha_expired() {
        console.log('captcha expired');
        submit = false;
    }

    $('.toggle-games').on('click', function(){
        $('#admin-games').toggle();
    });

    $('.toggle-suggestions').on('click', function(){
        $('#admin-suggestions').toggle();
    });

    $('#toast').on('click', function(){
        $('#toast').toggle();
    });

    function scrollto(element){
        $('html, body').animate({ scrollTop: ($(element).offset().top)}, 'slow');
    }
});