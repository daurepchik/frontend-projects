toTop()

function toTop() {
    'use strict';

    const goTopBtn = document.querySelector('.to-top');

    function trackScroll() {
        let scrolled = window.pageYOffset;
        let coords = document.documentElement.clientHeight;

        if (scrolled > coords && goTopBtn) {
            goTopBtn.classList.add('to-top-show');
        }
        if (scrolled < coords && goTopBtn) {
            goTopBtn.classList.remove('to-top-show');
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollTo(0, 0);
        }
    }

    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
}
