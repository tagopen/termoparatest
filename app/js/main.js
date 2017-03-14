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

  // Masked phone
  if ($("[name=phone]").length) {
    $("[name=phone]").mask("+ 38 (999) 999-99-99");
  }

  // Fancy Box
  if ($("a.fancyimage").length) {
    $("a.fancyimage").fancybox(); 
  }
  
  // Привет верстальщику
  $(function () {
    var count = 0;

    $('.test__btn--egg').on('mouseover', function (e) {
      var ink = $(this),
          inkX = ink.offset().left,
          inkY = ink.offset().top,
          inkW = ink.width(),
          inkH = ink.height(),
          coef = 3,
          inkNewX = 0,
          inkNewY = 0,
          x = (e.pageX),
          y = (e.pageY),
          text = ['Лол. Доганяй', 'Больше экшена', 'У ты какой.', 'Ааа, горит','Попробуй найди', 'TROLOLO', '卐', 'Суслик спрятался', 'Привет верстальщику'];

      $(this).css({
        'position':'relative'
      });

      switch (count) {
        case 0:
          ink.css({top: '-50px', left: '-140px'});
          break;
        case 1: 
          ink.css({top: '-250px', left: '-250px'});
          break;
        case 2:
          ink.css({top: '-150px', left: '0px'});
          ink.css({'background': '#00ba9e'});
          break;
        case 3:
          ink.css({top: '50px', left: '50px'});
          ink.css({'background': '#da4b00'});
          break;
        case 4:
          ink.css({top: '0', left: '0'});
          ink.css({'background': '#a29999'});
          break;
        case 5:
          ink.css({top: '0', left: $(window).width() + 15 + 'px'});
          ink.css({'background': '#da4b00'});
          break;
        case 6:
          ink.css({top: '0px', left: '0px'});
          ink.css({'background': '#da4b00'});
          break;
        case 7:
          ink.css({top: '-90px', left: '-99px'});
          break;
        case 8:
          ink.css({top: '2px', left: '2px'});
          break;
        case 9:
          ink.css({top: '150px', left: '150px'});
          break;
      }

      ink.text(text[count]);

      if(count == text.length - 1) {
        ink.hide();
      }

      count ++;
    });
  });

  $('.test__btn[data-target]').on('click', function(e) {
 
    var $contentItem  = $('.tabs__item'),
        itemPosition = $(this).data('target'),
        $question    = $('.question');

    $contentItem.filter(itemPosition)
    .addClass('tabs__item--active')
    .siblings()
    .removeClass('tabs__item--active');

    e.preventDefault();
  });

})(jQuery); // End of use strict