$(function() {
	// var bioBox = $('.bio-box');
	// console.log(bioBox.outerHeight());
	// bioBox.find(' > div').css({
	// 	height : bioBox.outerHeight(),
	// 	display : 'flex'
	// })
	// $('.bio-box').each(function() {
	// 	var currentHeight = $(this).outerHeight();
	// 	$(this).find(' > div').css({

	// 	})
	// })

	var wheelStatus = true;
	var wheelTimer;
	var activeStatus = false;

	function scrollDownBIO(active) {
		// if scroll point ::
		if(active.prev().hasClass('scroll-points')) return;

		if(!active.prev().length) return;
		addActive(active.prev())
	}
	function scrollUpBIO(active) {
		if(!active.next().length) return;
		addActive(active.next());
	}

	function addActive(active) {
		console.log('add active');
		
		var activeIndex = active.index() - 1;
		addActivePoint(activeIndex);


		active.siblings().removeClass('__next __prev __active')
		active.removeClass('__next __prev __active').addClass('__active')
		active.next().addClass('__next');
		if(active.prev().hasClass('scroll-points')) return;
		else active.prev().addClass('__prev');
	}

	function wheel(module) {
		console.warn('wheel ready...');
		if(!wheelStatus) return;

		var active = module.find('.bio-box-item.__active');
		if(!activeStatus) {
			addActive(active);
			activeStatus = true;
		}
		
		clearTimeout(wheelTimer);
		module.on('mousewheel DOMMouseScroll', function (event) {
			if(!wheelStatus) return;
			wheelStatus = false;

			//down
			if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
				console.log('down');
				// scrollDown();
				scrollDownBIO(active);
			}
			//up
			else {
				console.log('up');
				// scrollUp()
				scrollUpBIO(active)
			}

			$(this).off('mousewheel DOMMouseScroll');
			console.error('wheel off!');
			
			wheelTimer = setTimeout(function() {
				wheelStatus = true;
				wheel(module);
			}, 1200);
		});	
	}

	wheel($('.bio-box'));


	// add active point
	function addActivePoint(index) {
		$('.scroll-points').find('.point').eq(index).addClass('__active').siblings().removeClass('__active');
	}

	// scroll points {}
	$('.scroll-points').find('.point').on('click', function() {
		var old = $(this).parent().find('.__active').index();
		$(this).addClass('__active').siblings().removeClass('__active');
		var index = $(this).index();
		// addActive($('.bio-box-item').eq(index));
		// var iterations = Math.abs(index - old);
		var iterations = index - old;
		console.log(iterations);

		for(var i = 0; i < Math.abs(iterations); i++) {
			
			(function(e) {
				setTimeout(function() {
					var active = $('.bio-box-item.__active');
					(iterations < 0) ? scrollDownBIO(active) : scrollUpBIO(active)
				}, 400 * e);
			})(i);

			// setTimeout(function() {
			// 	if(iterations < 0) {
			// 		scrollDownBIO(active)
			// 	} else {
			// 		scrollUpBIO(active)
			// 	}
			// }, 1000 * Math.abs(iterations))
		}
	})
})
