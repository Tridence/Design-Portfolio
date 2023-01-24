/* ----------------------------------------------------------------


[ Custom code ]

01. Mobile
02. Animations
03. Burger Menu
04. Click outside of offcanvason
05. Sub Menu
06. Close navbar-collapse when a clicked
07. Button
08. Sections background image from data background 
09. YouTubePopUp
10. Team owlCarousel
11. Clients owlCarousel
12. Potfolio owlCarousel
13. Homepage Blog owlCarousel
14. Services owlCarousel
15. Testimonials owlCarousel
16. Magnific Popup
17. Scroll back to top
18. Contact Form
19. Accordion Box


------------------------------------------------------------------- */

(function () {
    'use strict';
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        }
        , BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        }
        , iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        }
        , Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        }
        , Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        }
        , any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    // Full Height
    var fullHeight = function () {
        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };
    
    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            }
                            else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            }
                            else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            }
                            else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    
    // Burger Menu 
    var burgerMenu = function () {
        $('.js-lonon-nav-toggle').on('click', function (event) {
            event.preventDefault();
            var $this = $(this);
            if ($('body').hasClass('offcanvason')) {
                $this.removeClass('active');
                $('body').removeClass('offcanvason');
            }
            else {
                $this.addClass('active');
                $('body').addClass('offcanvason');
            }
        });
    };
    
    // Click outside of offcanvason
    var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
            var container = $("#lonon-aside, .js-lonon-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('offcanvason')) {
                    $('body').removeClass('offcanvason');
                    $('.js-lonon-nav-toggle').removeClass('active');
                }
            }
        });
        $(window).scroll(function () {
            if ($('body').hasClass('offcanvason')) {
                $('body').removeClass('offcanvason');
                $('.js-lonon-nav-toggle').removeClass('active');
            }
        });
    };
    
    // Sub Menu 
    $('.lonon-main-menu li.lonon-sub>a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });
    $('.lonon-main-menu>ul>li.lonon-sub>a').append('<span class="holder"></span>');
    
    // Close navbar-collapse when a clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    // Button
    var buttons = document.querySelectorAll(".btn .blog-entry .blog-img ol.comment-list li.comment .reply a");
    for(var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.addEventListener("click", function() {
        if(!button.classList.contains("active"))
          button.classList.add("active");
        else
          button.classList.remove("active");
      });
    }
    // Document on load.
    $(function () {
        fullHeight();
        contentWayPoint();
        burgerMenu();
        mobileMenuOutsideClick();
    });
    
    // Sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // YouTubePopUp
    $("a.vid").YouTubePopUp();
    
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true
        , margin: 30
        , dots: true
        , mouseDrag: true
        , autoplay: false
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 3
            }
        }
    });
    
    // Clients owlCarousel
    $('#clients .owl-carousel').owlCarousel({
        loop:true,
        margin: 15,
        mouseDrag:true,
        autoplay:true,
        dots: false,
        responsiveClass:true,
        responsive:{
            0:{
                margin: 10,
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
    
    // Portfolio owlCarousel
    $(window).on("load", function () {
    var e = $(".portfolio-filter")
        , a = $("#menu-filter");
    e.isotope({
        filter: "*"
        , layoutMode: "masonry"
        , animationOptions: {
            duration: 750
            , easing: "linear"
        }
    }), a.find("a").on("click", function () {
        var o = $(this).attr("data-filter");
        return a.find("a").removeClass("active"), $(this).addClass("active"), e.isotope({
            filter: o
            , animationOptions: {
                animationDuration: 750
                , easing: "linear"
                , queue: !1
            }
        }), !1
    })
});
    
    // Homepage Blog owlCarousel
    $('.homepageblog .owl-carousel').owlCarousel({
        loop: true
        , margin: 15
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , autoplayHoverPause:true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 2
            }
        }
    });
    
    // Services owlCarousel
    $('.services .owl-carousel').owlCarousel({
        loop: true
        , margin: 15
        , mouseDrag: true
        , autoplay: false
        , dots: true
        , autoplayHoverPause:true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 3
            }
        }
    });
    
    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:false,
        dots: true,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>","<span class='lnr ti-angle-right'></span>"],
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
    
    // Magnific Popup
    $(".img-zoom").magnificPopup({
    type: "image"
    , closeOnContentClick: !0
    , mainClass: "mfp-fade"
    , gallery: {
        enabled: !0
        , navigateByImgClick: !0
        , preload: [0, 1]
    }
});
    $(document).ready(function() {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-custom').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    
    //  Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    }) 

    // Contact Form
    var form = $('.contact__form'),
        message = $('.contact__msg'),
        form_data;
    // success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }
    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
    
    
    // Accordion Box
    if ($(".accordion-box").length) {
        $(".accordion-box").on("click", ".acc-btn", function () {
          var outerBox = $(this).parents(".accordion-box");
          var target = $(this).parents(".accordion");

          if ($(this).next(".acc-content").is(":visible")) {
            //return false;
            $(this).removeClass("active");
            $(this).next(".acc-content").slideUp(300);
            $(outerBox).children(".accordion").removeClass("active-block");
          } else {
            $(outerBox).find(".accordion .acc-btn").removeClass("active");
            $(this).addClass("active");
            $(outerBox).children(".accordion").removeClass("active-block");
            $(outerBox).find(".accordion").children(".acc-content").slideUp(300);
            target.addClass("active-block");
            $(this).next(".acc-content").slideDown(300);
          }
        });
      }
    
}());
