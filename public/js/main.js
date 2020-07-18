 ;
 (function ($) {
     "use strict";

     /*--------- WOW js-----------*/
     function bodyScrollAnimation() {
         var scrollAnimate = $('body').data('scroll-animation');
         if (scrollAnimate === true) {
             new WOW({}).init()
         }
     }
     bodyScrollAnimation();
     
     /*=============================================== 
	       Parallax Init
	  ================================================*/
	if ($('#image_animation').length > 0 ) {
        $('#image_animation').parallax({
            scalarX: 10.0,
            scalarY: 0.0,
        }); 
	}
     
    /*--------------- slick js--------*/
    if ($('.utility_slider').length) {
        $('.utility_slider').slick({
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplaySpeed: 2000,
            speed: 1000,
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
            },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
            }

          ]
        });
    }
     
  
    /*---------------Navbar Fixed js ---------------*/
    function navbarFixed(){
        if ( $('.menu_one').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll){
                    $(".menu_one").addClass("navbar_fixed");
                } else {
                    $(".menu_one").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();
     
    /*---------------navbar js ---------------*/
    $('.menu_one ul li a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 75
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

 })(jQuery)