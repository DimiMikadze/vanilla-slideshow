# Vanilla Javascript CSS3 Fullscreen Responsive Slideshow

Easy to use Pure javascript and CSS3 Responsive Fullscreen Slideshow

## Features

- Lightweight, No libraries required
- CSS3 Transitions
- Responsive
- Fullscreen 
- Easy to use

## Getting Started

Use the viewport meta tag to control layout on mobile browsers

````
<meta name="viewport" content="width=device-width, initial-scale=1">
````
Required HTML

````
<div id="vanilla-slideshow-container">

	<div id="vanilla-slideshow">
		
		<div class="vanilla-slide">
			<img src="images/tiger1.jpg" alt="tiger">

			content here ...
		</div>

		<div class="vanilla-slide">
			<img src="images/tiger2.jpg" alt="tiger">

			content here ...
		</div>
		
		<div class="vanilla-slide">
			<img src="images/tiger3.jpg" alt="tiger">

			content here ...
		</div>
		
		<div class="vanilla-slide">
			<img src="images/tiger4.jpg" alt="tiger">

			content here ...
		</div>

	</div>

	<div id="vanilla-indicators"></div>

	<div id="vanilla-slideshow-previous">
		<img src="images/arrow-previous.png" alt="slideshow arrow">
	</div>
	<div id="vanilla-slideshow-next">
		<img src="images/arrow-next.png" alt="slideshow arrow">
	</div>
</div>	
````
You can also use data-src and full path of image to display css background images

````
	<div id="vanilla-slideshow">
		
		<div class="vanilla-slide" data-src="images/tiger1.jpg">content here ...</div>

		<div class="vanilla-slide" data-src="images/tiger2.jpg">content here ...</div>
		
		<div class="vanilla-slide" data-src="images/tiger3.jpg">content here ...</div>
		
		<div class="vanilla-slide" data-src="images/tiger4.jpg">content here ...</div>

	</div>
````

1. include css/vanillaSlideshow.css
2. include js/vanillaSlideshow.min.js Or js/vanillaSlideshow.js

after including javascript file initilize slideshow

````
<script>
	vanillaSlideshow.init();
</script>
````

## Options

To customize functionality pass object to init function

````
<script>
	vanillaSlideshow.init({
		
		// auto slideshow, options: true or false
		slideshow: true,
		
		// slideshow delay
		delay: 5000,
		
		// display arrows, options: true or false
		arrows: true,
		
		// display indicators, options: true or false
		indicators: true,
	
		// start slideshow randomly, options: true or false
		random: false,
	
		// animation speed
		animationSpeed: '1s'

	});
</script>
````

## Bower

````
bower install vanilla-slideshow
````

## Contributing

1. Fork it
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

See license.txt


