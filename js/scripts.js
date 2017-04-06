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
      $(slide).parent()
        .width(slide.clientWidth)
        .height(slide.clientHeight)
      var scrollUntill = slideshowWidth - window.innerWidth/2 + (slide.clientWidth+80)/2;
      $(slide).parent().off( 'click' );
      $(slide).parent().click(function(){
        // if(!is_touch_device()) {
        //   $('.slide-box').removeClass('focus');
        // }
        $('.slide-box').removeClass('focus');
        $(this).addClass('focus');
        if (scrollUntill > 0 && !is_touch_device()) {
          $(slideshow).parent().animate({
            scrollLeft: scrollUntill
          }, 500);
        } else if(!is_touch_device()) {
          $(slideshow).parent().animate({
            scrollLeft: 0
          }, 500);
        }
      });
      slideshowWidth += slide.clientWidth + slidesPadding;
    })
    
    slideshowWidth -= 0; // remove the last padding, but leave 1px for breath.
    $(slideshow).width(slideshowWidth);

  });
  // if (is_touch_device()) {
  //   $('.slide-box').addClass('focus');
  // }
  $('.slide-box').css('display','inline-block');
}

function enableRipples() {
	var myDropRadius = window.innerWidth>window.innerHeight ? window.innerWidth/20 : window.innerHeight/20;
	var myResolution = is_touch_device() ? 200 : 650;
	var myPerturbance = is_touch_device() ? 0.005 : 0.01;
  try {
    $('#cover').ripples({
      resolution: myResolution,
      dropRadius: myDropRadius, //px
      perturbance: myPerturbance,
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