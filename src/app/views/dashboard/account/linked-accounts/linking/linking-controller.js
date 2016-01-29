angular.module( 'App.Views' ).controller( 'Dashboard.Account.LinkedAccounts.LinkingCtrl', function( $stateParams, $state, App, Growls, Client )
{
	App.title = 'Waiting for Link';

	this.token = $stateParams.token;

	this.completed = function( response )
	{
		// Redirect them off to complete their social login like normal.
		if ( response.provider == 'facebook' ) {
			$state.go( 'dashboard.account.linked-accounts.link-callback', { provider: 'facebook', code: response.code, state: this.token } );
		}
		else if ( response.provider == 'twitter' ) {
			$state.go( 'dashboard.account.linked-accounts.link-callback', { provider: 'twitter', oauth_verifier: response['oauth-verifier'], state: this.token } );
		}

		// Focus back to the Client.
		Client.show();
	};

	this.failed = function( response )
	{
		Growls.error( 'Could not link.', 'Link Failed' );
		$state.go( '^' );
	};
} );