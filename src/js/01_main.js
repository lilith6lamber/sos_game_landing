const wait = (delay = 0) =>
    new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (selector, visible) => {
    selector = document.getElementById(selector);
    if (visible) {
        selector.classList.add("visible");
        document.documentElement.style.overflowY = 'hidden';
    } else {
        selector.classList.remove("visible");
        document.body.classList.add("visible");
        document.documentElement.style.overflowY = 'visible';
    }
}

setVisible('loadingScreen', true);

document.addEventListener('DOMContentLoaded', () =>
    wait(1200).then(() => {
        setVisible('loadingScreen', false);
    }));





$(document).ready(function () {

    let width = $(window).innerWidth();
    replaceIcons(width);

    let navList = $('.header_nav-list'),
        nav = $('.header_nav');
    
    $('body').on('click', '.menu-btn', () => {
        navList.toggleClass('open');
        nav.toggleClass('menu-open');
    })

    $('.header_nav-list .list-item').click(function () {
        $('.header_nav-list').removeClass('open');
        if (nav.hasClass('menu-open')) {
            nav.removeClass('menu-open');
        }
    });

    new WOW().init();
    aboutSlider();
    accordion();

    let waypoint = new Waypoint({
        element: document.getElementById('about'),
        handler: function (direction) {
            function click() {
                document.getElementById('click').click()
            }

            function click2() {
                document.getElementById('click_2').click()
            }
            setTimeout(click, 2800);
            setTimeout(click2, 5600);
        }
    })
});

function aboutSlider() {
    let owl = $('.owl-carousel');
    let owlPrev = $('.owl-prev');
    let owlNext = $('.owl-next');
    let dotsContainer = $('.owl-dots');
    let dotsHtml = '';
    let dot = '';
    let currentIndex = 0;
    let dotCircle = '';

    owl.on('initialized.owl.carousel', event => {
        let currentIndex = event.item.index;
        let total = event.item.count;
        if (currentIndex === 0) {
            owlPrev.hide();
        }

        owl.on('resize.owl.carousel', event => {
            owl.trigger('refresh.owl.carousel');
        });

        for (let i = 0; i < total; i++) {
            if (i === 0) {
                dotsHtml += `
                <li class="owl-dots_item progress">
                    <span class="circle active"></span>
                </li>
            `;
            } else {
                dotsHtml += `
                    <li class="owl-dots_item" >
                        <span class="circle"></span>
                    </li>
                `;
            }
            dotsContainer.html(dotsHtml);
        }
    })

    owl.on('changed.owl.carousel', event => {
        currentIndex = event.item.index;
        let total = event.item.count;
        dot = $('.owl-dots_item');
        dotCircle = $('.owl-dots_item .circle');


        if (currentIndex != 0) {
            owlPrev.show();
        } else {
            owlPrev.hide();
        }
        if (currentIndex + 1 === total) {
            owlNext.hide();
        } else {
            owlNext.show();
        }

    })

    owl.owlCarousel({
        items: 1,
        animateOut: 'fadeOut',
        dots: false
    });

    owlNext.click(function () {
        owl.trigger('next.owl.carousel');
        dot.eq(currentIndex).addClass('progress');
        dotCircle.eq(currentIndex).addClass('active');
    })

    owlPrev.click(function () {
        owl.trigger('prev.owl.carousel');
        dot.eq(currentIndex + 1).removeClass('progress');
        dotCircle.eq(currentIndex + 1).removeClass('active');
    })
}

function accordion() {
    let trigger = $('.accordion_item-title');
    let triggerExp = $('.accordion_item-title expanded');
    let text = $('.accordion_item-text');
    let indicator = $('.accordion_item-circle');
    let accordionItem = $('.accordion_item');
    let expandCounter = triggerExp.length + 1;

    accordionItem.on('click', (e) => {
        if (e.target === trigger[expandCounter]) {
            text.eq(expandCounter - 1).addClass('hide');
            text.eq(expandCounter).removeClass('hide');
            indicator.eq(expandCounter).addClass('filled');
            accordionItem.eq(expandCounter).addClass('progress');
            expandCounter++;
        }
    })
}

$(window).scroll(function () {
    let width = $(window).innerWidth();
    if (width <= 992) {
        navScroll();
    }
});

let nav = $('.header_nav'),
    sticky = nav.offset().top;

function navScroll() {
    if (window.pageYOffset > sticky) {
        nav.addClass('sticky');
    } else {
        nav.removeClass('sticky');
    }
}

$(window).resize(function () {
    let width = $(window).innerWidth();
    replaceIcons(width);
});

function replaceIcons(width) {
    let iconsContainer = $('.header_nav-buy');
    let html = '';
    if (width <= 992) {
        html = '<button class="menu-btn"></button>';
    } else {
        html = `
                <a class="xbox" href="javascript:(void)" target="_blank" rel="noopener noreferrer">
                    <i class="icon-xbox"></i>
                </a>
                <a class="steam" href="javascript:(void)" target="_blank" rel="noopener noreferrer">
                    <i class="icon-steam"></i>
                </a>
        `;
    }
    iconsContainer.html(html);
}