window.Procrastimate = (function( window, document, undefined ) {
	// constuctor returns a new instance of the init function.
	function Procrastimate( options ) {
		return new Procrastimate.prototype.init( options || null );
	}

	/**
	 * Super charged forEach loop that iterates on Objects, Arrays, and NodeLists
	 *
	 * @param  {Mixed}     obj        What to iterate over.
	 * @param  {Function}  fn         Function to call on each iteration.
	 * @param  {Object}    [context]  Context to apply while iterating.
	 * @return {Mixed}                obj is returned back.
	 */
	Procrastimate.forEach = function( obj, fn, context ) {
		if( !obj || !fn ) {
			return {};
		}

		context = context || this;

		var key;
		var len;

		if( Array.prototype.forEach && obj.forEach === Array.prototype.forEach ) {
			return obj.forEach( fn, context );
		}

		if( Object.prototype.toString.call( obj ) === '[object NodeList]' ) {
			for( key = 0, len = obj.length; key < len; key++ ) {
				fn.call( context, obj[ key ], key, obj );
			}
			return obj;
		}

		for( key in obj ) {
			if( Object.prototype.hasOwnProperty.call( obj, key ) ) {
				fn.call( context, obj[ key ], key, obj );
			}
		}

		return obj;
	};

	/**
	 * Object extender. Takes 2 to N objects extending onto the first,
	 * in the order provided.
	 *
	 * Note: extension is done in place.
	 *
	 * @param  {Object} obj    An object to extend.
	 * @param  {Object} [objN] Object to extend onto the first.
	 * @return {Object}        The extended object.
	 */
	Procrastimate.extend = function( obj ) {
		var dest = obj;
		var src = Array.prototype.slice.call( arguments, 1 );

		Procrastimate.forEach( src, function( copy ) {
			for( var prop in copy ) {
				dest[ prop ] = copy[ prop ];
			}
		});

		return obj;
	};

	/**
	 * Initialize Procrastimate, set options, add keybindings, etc...
	 *
	 * @example
	 *
	 * 	var procrastimate = Procrastimate({
	 * 		loop: true,
	 * 		fullscreen: false
	 * 	});
	 *
	 *
	 * @param  {Object} options Procrastimate options object.
	 * @return {Procrastimate}  A Procrastimate instance;
	 */
	Procrastimate.prototype.init = function( options ) {
		// create ref to this for use in other scopes below us.
		var self = this;

		// set options ( defaults < user )
		self.options = Procrastimate.extend({
			loop: document.querySelector( 'main' ).dataset.loop || false,
			fullscreen: document.querySelector( 'main' ).dataset.fullscreen || false
		}, options );

		// set initial slide
		self.slide = document.querySelector( 'main .slide' ).classList.add( 'active' );

		// setup keybindings
		window.addEventListener( 'keyup', function( event ) {
			self.keybindings.call( self, event );
		});

		/**
		 * Rescales the slide viewport to take up as much of the screen as possible
		 * whilst preserving aspect ratio.
		 *
		 * @return {Function} self invoked function that can be manually reinvoked.
		 */
		var rescale = (function rescale() {
			var props = [ 'WebkitTransform', 'MozTransform', 'msTransform', 'OTransform', 'transform' ];
			var width = document.querySelector( 'main' ).clientWidth / window.innerWidth;
			var height = document.querySelector( 'main' ).clientHeight / window.innerHeight;
			var denom = Math.max( width, height );

			props.forEach( function( prop ) {
				document.querySelector( 'main' ).style[ prop ] = 'scale( ' + ( 1 / denom ) + ' )';
			});

			return rescale;
		}());
		// reinvoke rescale on window resize.
		window.addEventListener( 'resize', rescale );

		// return self for chaining
		return self;
	};

	// Allow method chaining on the intit function.
	Procrastimate.prototype.init.prototype = Procrastimate.prototype;

	/*
		Deal with moving forwards and backwards through the slides.
	 */
	Procrastimate.extend( Procrastimate.prototype, {
		/**
		 * Change to next slide.
		 *
		 * @return {HTMLElement} HTMLElement for resulting slide.
		 */
		next: function() {
			this.slide.classList.remove( 'active' );

			if( this.slide.nextElementSibling && this.slide.nextElementSibling.classList.contains( 'slide' ) ) {
				this.slide = this.slide.nextElementSibling;
			}
			else if( this.options.loop ) {
				this.slide = document.querySelector( 'main .slide:first-child' );
			}

			this.slide.classList.add( 'active' );

			return this.slide;
		},
		/**
		 * Change to previous slide.
		 *
		 * @return {HTMLElement} HTMLElement for resulting slide.
		 */
		prev: function() {
			this.slide.classList.remove( 'active' );

			if( this.slide.previousElementSibling && this.slide.previousElementSibling.classList.contains( 'slide' ) ) {
				this.slide = this.slide.previousElementSibling;
			}
			else if( this.options.loop ) {
				this.slide = document.querySelector( 'main .slide:last-of-type' );
			}

			this.slide.classList.add( 'active' );

			return this.slide;
		},
	});

	// return out Procrastimate core.
	return Procrastimate;
})( this, this.document );
