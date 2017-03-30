$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

function is_touch_device() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }  
}

function setSlideshow() {
  var slidesPadding = 10;
  var slideshows = $('.slideshow');

  slideshows.each(function(i, slideshow){
    var slides = $(slideshow).find('.slide');
    var slideshowWidth = 0;

    slides.each(function(i, slide){
      var scrollUntill = slideshowWidth - window.innerWidth/2 + slide.clientWidth/2;      
      $(slide).click(function(){
        $(slides).removeClass('focus');
        $(this).addClass('focus');
        if (scrollUntill > 0 && !is_touch_device()) {
          $(slideshow).parent().animate({
            scrollLeft: scrollUntill
          }, 800);
        }
      });

      slideshowWidth += slide.clientWidth + slidesPadding;
    })
    
    slideshowWidth -= 9; // remove the last padding, but leave 1px for breath.
    $(slideshow).width(slideshowWidth);

  });

  // console.log('slideshow set');
}

function enableRipples() {
  try {
    $('#cover').ripples({
      resolution: 750,
      dropRadius: 75, //px
      perturbance: 0.01,
    });
  }
  catch (e) {
    console.log(e);
  }
}

$( document ).ready(function() {
  enableRipples();
});

$(window).bind("load", function() {
  setSlideshow();
});

$( window ).resize(function() {
  setSlideshow();
});