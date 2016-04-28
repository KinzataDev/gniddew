#!/usr/bin/env perl

use Mojo::UserAgent;
use Mojolicious::Lite;
use Mojo::Exception;
use DDP;

get '/' => sub {
	my $c = shift;

	$c->render( template => 'index' );
};

post '/rsvpsubmit' => sub {
	my $c = shift;

	my $rsvp_code = $c->req->param('rsvp_code');
	if( !defined $rsvp_code ) {
		$c->res->message('RSVP Code not posted... Let Max know his site is borked.');
		$c->rendered(404);
	}


};

app->start;
