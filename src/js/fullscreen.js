(function( window, document, Procrastimate, undefined ) {
	/*
		Deal with fullscreen
	 */
	Procrastimate.extend( Procrastimate.prototype, {
		fullscreen: function( allowFullscreen ) {
			allowFullscreen = allowFullscreen || this.options.fullscreen;

			var fullscreenEnabled = document.fullscreenEnabled ||
													document.webkitFullscreenEnabled ||
													document.mozFullScreenEnabled ||
													document.msFullscreenEnabled;

			/**
			 * Cross browser abstraction of fullscreen API
			 *
			 * @param  {Element} element Element to make fullscreen
			 */
			var requestFullscreen = function( element ) {
				if( element.requestFullscreen ) {
					element.requestFullscreen();
				}
				else if( element.webkitReqestFullscreen ) {
					element.webkitReqestFullscreen();
				}
				else if( element.mozRequestFullScreen ) {
					element.mozRequestFullScreen();
				}
				else if( element.msRequestFullscreen ) {
					element.msRequestFullscreen();
				}
			};

			if( fullscreenEnabled && allowFullscreen ) {
				requestFullscreen( document.documentElement );
			}
		}
	});
})( this, this.document, this.Procrastimate );
