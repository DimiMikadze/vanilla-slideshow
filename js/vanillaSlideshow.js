/*
 vanillaSlideshow v0.2
 (c) Dimitri Mikadze
 https://github.com/DimitriMikadze/vanilla-slideshow
 License: MIT
*/
var vanillaSlideshow = (function() {
	
	var app = {};

	// default properties
	var defaults = {
		delay: 5000,
		arrows: true,
		indicators: true,
		random: false,
		slideshow: true,
		animationSpeed: '1s'
	}

	// container divs
	var slideshowContainer = document.getElementById('vanilla-slideshow-container');
	var slideshow = document.getElementById('vanilla-slideshow');
	var slides = document.getElementById('vanilla-slideshow').getElementsByClassName('vanilla-slide');
	var arrowPrevious = 'vanilla-slideshow-previous';
	var arrowNext = 'vanilla-slideshow-next';
	var indicatorsContainer = 'vanilla-indicators';

	// check properties
	function _checkProperties() {

		var random = (defaults.random) ? _randomInt(0, slides.length - 1) : 0;

		for(var i=0; i<slides.length; i++) {
			
			if(slides[i].getAttribute('data-src') !== null) {
				slides[i].style.backgroundImage  = 'url( ' + slides[i].getAttribute('data-src') + ')';
			}

			if(i === random) { slides[i].className += ' vanilla-active'; }

			_setVendor(slides[i], 'Transition', defaults.animationSpeed);

		}

	};

	// slideshow function
	function _slideShow() {

		var active = document.querySelector('#' + slideshow.getAttribute('id') + ' .vanilla-active');
		var next = (_nextElement(active)) ? _nextElement(active) : slides[0];

		// classes
		active.className = 'vanilla-slide';
		next.className += ' vanilla-active';

		// indicators
		if(defaults.indicators) {
			var activePointer = document.querySelector('#' + indicatorsContainer + ' .vanilla-active');
			var nextPointer = (_nextElement(activePointer)) ? _nextElement(activePointer) : app.indicators[0];
			activePointer.className = activePointer.className.replace(/(?:^|\s)vanilla-active(?!\S)/g, '');
			nextPointer.className += ' vanilla-active';		
		}

	};

	// Previous slide
	function _previousSlide() {

		_stopSlideshow();

		var active = document.querySelector('#' + slideshow.getAttribute('id') + ' .vanilla-active');
		var previous = (_previousElement(active) ? _previousElement(active) : slides[slides.length - 1]);

		// classes
		active.className = 'vanilla-slide';
		previous.className += ' vanilla-active';

		// indicators
		if(defaults.indicators) {
			var activePointer = document.querySelector('#' + indicatorsContainer + ' .vanilla-active');
			var nextPointer = (_previousElement(activePointer)) ? _previousElement(activePointer) : app.indicators[app.indicators.length - 1];
			activePointer.className = activePointer.className.replace(/(?:^|\s)vanilla-active(?!\S)/g, '');
			nextPointer.className += ' vanilla-active';		
		}		
		
		if(defaults.slideshow) {
			_startSlideshow();
		}
	
	};

	// Next slide
	function _nextSlide() {
		
		_stopSlideshow();

		_slideShow();

		if(defaults.slideshow) {
			_startSlideshow();
		}

	};

	// create indicators and add event listeners
	function _createIndicators() {

		for(var i=0; i<slides.length; i++) {
			var node = document.createElement("div");
			var indicators = document.getElementById(indicatorsContainer).appendChild(node);
			indicators.addEventListener("click", function() {
				_indicatorsClick(this);
			});
			indicators.className = indicatorsContainer;
			if(_hasClass(slides[i], 'vanilla-active')) {
				indicators.className += ' vanilla-active';
			}
		}

		app.indicators = slideshowContainer.getElementsByClassName(indicatorsContainer);

	};

	// indicators click function
	function _indicatorsClick(self) {
			
		_stopSlideshow();
		
		// remove active classes
		for(var i=0; i<slides.length; i++) {
			if(_hasClass(app.indicators[i], 'vanilla-active')) {
				app.indicators[i].className = app.indicators[i].className.replace(/(?:^|\s)vanilla-active(?!\S)/g, '');
			}	
			if(_hasClass(slides[i], 'vanilla-active')) {
				slides[i].className = 'vanilla-slide';
			}	
		}

		// add active class 
		var i = Array.prototype.indexOf.call(app.indicators, self);
		app.indicators[i].className += ' vanilla-active';

		// add classes to slide
		slides[i].className += ' vanilla-active';

		if(defaults.slideshow) {
			_startSlideshow();
		}

	};

	// start slideshow
	function _startSlideshow() {

		app.intervalSliding = setInterval(function() {
			_slideShow();
		}, defaults.delay);
	};

	// stop slideshow
	function _stopSlideshow() {

		clearInterval(app.intervalSliding);
	};

	// set browser vendor properties
	function _setVendor(element, property, value) {
	  element.style["webkit" + property] = value + ' ease-in-out';
	  element.style["Moz" + property] = value + ' ease-in-out';
	  element.style["ms" + property] = value + ' ease-in-out';
	  element.style["o" + property] = value + ' ease-in-out';
	};

	// has class 
	function _hasClass(element, cls) {
    	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	};

	// Next element
	function _nextElement(element) {
	    do {
	        element = element.nextSibling;
	    } while (element && element.nodeType !== 1);

	    return element;        
	};

	// Previous element
	function _previousElement(element) {
	    do {
	        element = element.previousSibling;
	    } while (element && element.nodeType !== 1);

	    return element;  
	};

	// Random number
	function _randomInt(min, max) {

    	return Math.floor(Math.random() * (max - min + 1) + min);
	};

	// init function
	app.init = function(arguments) {

		if( ! slideshowContainer) { return false; }

		// check if options is present
	  	if(arguments && typeof arguments === "object") {
	    	defaults.arrows = (arguments.arrows !== '') ? arguments.arrows : defaults.arrows;
	    	defaults.indicators = (arguments.indicators !== '') ? arguments.indicators : defaults.indicators;
	    	defaults.random = (arguments.random !== '') ? arguments.random : defaults.random;
	    	defaults.slideshow = (arguments.slideshow !== '') ? arguments.slideshow : defaults.slideshow;
	    	defaults.delay = (arguments.delay) ? arguments.delay : defaults.delay;
	    	defaults.animationSpeed = (arguments.animationSpeed) ? arguments.animationSpeed : defaults.animationSpeed;
	    }

		_checkProperties();
		
		if(slides.length > 1) {
			
			if(defaults.arrows) {

				document.getElementById(arrowNext).addEventListener('click', function() {
					_nextSlide();
				});	
				document.getElementById(arrowPrevious).addEventListener('click', function() {
					_previousSlide();
				});
				document.getElementById(arrowPrevious).style.display = 'block';
				document.getElementById(arrowNext).style.display = 'block';
			}

			if(defaults.indicators) {
				_createIndicators();
			}
			if(defaults.slideshow) {
				_startSlideshow();
			}
		}
		
	};

	return app;

}(vanillaSlideshow));