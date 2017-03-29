function setSlideshow() {
	var slidesPadding = 10;
	var slideshows = $('.slideshow');
	// console.log(slideshows);

	slideshows.each(function(i, slideshow){
		// console.log(slideshow);
		var slides = $(slideshow).find('.slide');
		var slideshowWidth = 0;

		slides.each(function(i, slide){
			// console.log(slide.clientWidth);
			slideshowWidth += slide.clientWidth + slidesPadding;
		})
		
		slideshowWidth -= 9; // remove the last padding, but leave 1px for breath.
		//console.log('width',slideshowWidth);
		$(slideshow).width(slideshowWidth);
	});
	console.log('slideshow set');
}

setSlideshow();

$( window ).resize(function() {
  setSlideshow();
});