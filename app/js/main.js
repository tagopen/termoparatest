(function($) {
  "use strict"; // Start of use strict

  $(window).load(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      $('body').addClass('ios');
    };
    $('body').removeClass('loaded'); 
  });

  // Old browser notification
  $(function() { 
    $.reject({
      reject: {
        msie: 9
      },
      imagePath: 'img/icons/jReject/',
      display: [ 'chrome','firefox','safari','opera' ],
      closeCookie: true,
      cookieSettings: {
        expires: 60*60*24*365
      },
      header: 'Ваш браузер устарел!',
      paragraph1: 'Вы пользуетесь устаревшим браузером, который не поддерживает современные веб-стандарты и представляет угрозу вашей безопасности.',
      paragraph2: 'Пожалуйста, установите современный браузер:',
      closeMessage: 'Закрывая это уведомление вы соглашаетесь с тем, что сайт в вашем браузере может отображаться некорректно.',
      closeLink: 'Закрыть это уведомление',
    });
  });

  $('.about__link').on('click', function(e) {
    e.preventDefault();
  });

  // Masked phone
  if ($("[name=phone]").length) {
    $("[name=phone]").mask("+ 38 (999) 999-99-99");
  }

  // Fancy Box
  if ($("a.fancyimage").length) {
    $("a.fancyimage").fancybox(); 
  }

  $('.radio-btn__control').on('click, change', function() {
    console.log($(this));
    $(this).parents('.question')
      .find('.test__btn[data-target]')
      .removeClass('hidden');
  });

  $('.test__btn[data-target]').on('click', function(e) {
 
    var $contentItem  = $('.tabs__item'),
        itemPosition = $(this).data('target'),
        $question    = $('.question');

    $contentItem.filter(itemPosition)
    .addClass('tabs__item--active')
    .siblings()
    .removeClass('tabs__item--active')
    .find('.radio-btn__control')
    .removeClass('hidden');

    e.preventDefault();
  });
  if ($('.comment__slider').length) {
    $('.comment__slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      mobileFirst: true,
      centerMode: true,
      swipeToSlide: '15',
      responsive: [
          {
          breakpoint: 767,
          settings: {
            arrows: false,
            dots: true,
            centerMode: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerPadding: '0'
          }
        },
        {
          breakpoint: 0,
          settings: {
            dots: true,
            arrows: false,
            speed: 300,
            centerMode: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
 // Equal height plugin
  $.fn.equialHeight = (function() {
    var $tallestcolumn = 0;
    var $currentHeight = 0;
    $.each($(this), function (index, value) {
      $currentHeight = $(this).height();
      if($currentHeight > $tallestcolumn)
      {
        $tallestcolumn = $currentHeight;
      }
    });
    $(this).height($tallestcolumn);
    return $(this);
  });

})(jQuery); // End of use strict

// Equial Height
$(window).on('resize', function(){
  // Only 768+
  if( $( window ).width() >= 768 ) {
    $('.product--group1').equialHeight();
    $('.product--group2').equialHeight();
    $('.product--group3').equialHeight();
    $('.service').equialHeight();
  }

  $('.comment__text').equialHeight();
}).trigger('resize');