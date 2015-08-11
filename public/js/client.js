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

    if (PAGE_TYPE == 'index' || PAGE_TYPE == 'community' || PAGE_TYPE == 'released' || PAGE_TYPE == 'admin') {
        curr_id = 0;
        var games;
        var submit = false;

        $.get('/api/games/all', function (data) {
            games = data;
        });

        $('.game').on('click', function () {
            var id = $(this).attr('id');
            if ($('#gameinfo-container').css('display') === 'none' || id != curr_id) {
                $('#gameinfo-container').fadeIn('fast');
                for (var game in games) {
                    if (games.hasOwnProperty(game)) {
                        var obj = games[game];
                        if (obj.id == id) {
                            $('#gameinfo-title').text(obj.title);
                            $('#gameinfo-description').text(obj.description);
                            $('#gameinfo-dev').text("Developer: " + obj.developer);
                            $('#gameinfo-publisher').text("Publisher: " + obj.publisher);
                            $('#gameinfo-release').text("Release: " + obj.releasedate);
                            $('#gameinfo-hp').html("<a target='_blank' href='" + obj.homepage + "'>Offizielle Website</a>");
                            $('#gameinfo-vid').html("<div class='embed-container'><iframe src='https://www.youtube.com/embed/" + obj.trailerID + "' frameborder='0' allowfullscreen></iframe></div>");
                        }
                    }
                }


                curr_id = id;
            } else {
                $('#gameinfo-container').fadeOut('fast');
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

        $('#suggestform').submit(function () {
            alert('Vielen Dank! Dein Vorschlag wurde entgegengenommen.')
        });

        $('.toggle-games').on('click', function(){
            $('#admin-games').toggle();
        });

        $('.toggle-suggestions').on('click', function(){
            $('#admin-suggestions').toggle();
        });

        $('#toast').on('click', function(){
            $('#toast').toggle();
        });
    }
});