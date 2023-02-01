// Welcome Slider
const $status = $('.welcome-slider-controls-pages');
const $welcomeSlider = $('.welcome-slider-imgs');
const $welcomeControlLeft = $('.welcome-slider-controls-arrow-left');
const $welcomeControlRight = $('.welcome-slider-controls-arrow-right');
const $welcomeControlBullets = $('.welcome-slider-controls-bullet');

$welcomeSlider.slick({
    arrows: false,
    dots: false,
    waitForAnimate: false,
    variableWidth: true,
    lazyLoad: 'ondemand',
});

$welcomeSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    let i = (currentSlide ? currentSlide : 0) + 1;
    $status.text("0" + i + ' | ' + "0" + slick.slideCount);
    $welcomeControlBullets.removeClass('active');
    $welcomeControlBullets.eq(i - 1).toggleClass('active');
});

for (let i = 1; i <= 5; i++) {
    $welcomeSlider.slick('slickAdd', `<div class="welcome-slider-item welcome-slider-item${i}"></div>`);
    setWelcomeBackground(i)
}

$welcomeControlLeft.click(e => {
    $welcomeSlider.slick('slickPrev')
})
$welcomeControlRight.click(e => {
    $welcomeSlider.slick('slickNext')
})
$welcomeControlBullets.click(e => {
    e.preventDefault();
    const target = $(e.target)
    const slideNum = target.data('slide');
    $welcomeSlider.slick('slickGoTo', slideNum);
    $welcomeControlBullets.removeClass('active');
    target.toggleClass('active');
});
$(window).resize(() => {
    for (let i = 1; i <= 5; i++) {
        setWelcomeBackground(i)
    }
})

function setWelcomeBackground(i) {
    if ($(window).width() > 768) {
        $(`.welcome-slider-item${i}`).css({
            'background': `linear-gradient(90deg,#000000 0%,rgba(0, 0, 0, 0.5) 16.19%,rgba(0, 0, 0, 0) 30.73%),url("assets/img/welcome-slider/${i}.webp") no-repeat`,
            'background-size': 'contain'
        })
    } else {
        $(`.welcome-slider-item${i}`).css({
            'background': `url("assets/img/welcome-slider/${i}.webp") no-repeat`,
            'background-size': 'contain'
        })
    }

}

// Video slider
let $videoPlayer = $('.video-player-slider');
let $videoSlider = $('.video-slider');
let $videoControlLeft = $('.video-slider-controls-arrow-left');
let $videoControlRight = $('.video-slider-controls-arrow-right');
let $videoControlBullets = $('.video-slider-controls-bullet');

$videoPlayer.slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    fade: true,
    draggable: false,
    swipe: false,
    touchMove: false,
    asNavFor: $videoSlider,
    lazyLoad: 'ondemand',
})

$videoSlider.slick({
    arrows: false,
    dots: false,
    slidesToShow: 3,
    draggable: false,
    swipe: false,
    touchMove: false,
    variableWidth: true,
    asNavFor: $videoPlayer,
    lazyLoad: 'ondemand',
    responsive: [{
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
        }
    }]
})

$videoSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    let i = (currentSlide ? currentSlide : 0);
    $videoControlBullets.removeClass('active');
    $videoControlBullets.eq(i).toggleClass('active');
});

$videoControlLeft.click(e => {
    $videoPlayer.slick('slickPrev')
})
$videoControlRight.click(e => {
    $videoPlayer.slick('slickNext')
})
$videoControlBullets.click(e => {
    e.preventDefault();
    const target = $(e.target)
    const slideNum = target.data('slide');
    $videoPlayer.slick('slickGoTo', slideNum);
    $videoControlBullets.removeClass('active');
    target.toggleClass('active');
});