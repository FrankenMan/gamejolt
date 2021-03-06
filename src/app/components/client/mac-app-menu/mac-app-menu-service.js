angular.module( 'App.Client.MacAppMenu' )
.run( function( MacAppMenu, Device )
{
	if ( Device.os() == 'mac' ) {
		MacAppMenu.init();
	}
} )
.service( 'MacAppMenu', function( $state, Screen, Client, App, User_TokenModal )
{
	var gui = require( 'nw.gui' );

	this.init = function( section )
	{
		var win = gui.Window.get();
		var menu = new gui.Menu( { type: 'menubar' } );

		menu.createMacBuiltin( 'Game Jolt Client', {
			// hideEdit: false,
			// hideWindow: false,
		} );

		win.menu = menu;

		win.on( 'close', function( intent )
		{
			// If we should just minimize instead of quitting.
			// Many applications on mac just minimize instead of actually close.
			if ( intent != 'quit' ) {
				win.hide();
			}
			else {
				Client.quit();
			}
		} );

		// reopen is Mac specific
		// When they click the dock, we need to show it in case they hid it with the close.
		gui.App.on( 'reopen', function()
		{
			win.show();
		} );
	};
} );
