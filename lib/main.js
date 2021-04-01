var lastScrollTop = 0;
var delta = 5;
var startNavBar = $("#section1").offset().top;

$(window).on("scroll load resize", function () {
    checkScroll();
});

function checkScroll() {
    var st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > startNavBar) {
        $('.nav_bar').removeClass('hidden')
    } else {
        $('.nav_bar').addClass('hidden');
    }

    lastScrollTop = st;
}