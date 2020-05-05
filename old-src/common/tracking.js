var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-67059303-4']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackClick(e) {
    _gaq.push(['_trackEvent', e.target.id, 'click']);
}

function prepareEventTracking() {
    var tabs = document.body.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', trackClick);
    }

    var buttons = document.body.querySelectorAll("button");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', trackClick);
    }
}
