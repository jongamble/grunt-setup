(function(window, document, $) {
	
	$('.header-button-menu').on('click', function(e){
		$('.internal-menu').slideToggle();
		return false;
	});
	$('.switchButton').on('click', function(e){
		$(this).toggleClass('active');
		//e.preventDefault();
		return false;
	});

	$(window).on('resize', function(){
		$('.internal-menu').hide();
	})

}(this, this.document, this.jQuery));