(function( window, document, Procrastimate, undefined ) {
	Procrastimate.extend( Procrastimate.prototype, {
		keybindings: function( event ) {
			switch( event.keyCode ) {
				case 13: // Enter
				case 32: // Space
				case 39: // Right
				case 40: // Down
				case 74: // j
					if (event.altKey || event.ctrlKey || event.metaKey) {
						return;
					}
					this.next();
				break;

				case 37: // Up
				case 38: // Left
				case 75: // k
					if (event.altKey || event.ctrlKey || event.metaKey) {
						return;
					}
					this.prev();
				break;

				case 70: // f
					if (event.altKey || event.ctrlKey || event.metaKey) {
						return;
					}
					this.fullscreen( true );
				break;

				case 72: // h
				case 191: // ?
					if (event.altKey || event.ctrlKey || event.metaKey) {
						return;
					}
					if( event.keyCode === 191 && !event.shiftKey ) {
						return;
					}

					this.helpInfo();
				break;
			}
		}
	});
})( this, this.document, this.Procrastimate );
