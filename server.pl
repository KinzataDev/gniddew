#!/usr/bin/env perl

use lib "$FindBin::Bin/lib";

use Mojo::UserAgent;
use Mojolicious::Lite;
use Mojo::Exception;
use Mojo::JSON qw/ encode_json /;
use DDP;

use Wedding::Config;
use Wedding;

use Wedding::Model::RSVP;

helper mysql => sub { state $mysql = Wedding->_mysql };
helper rsvp => sub { state $rsvp = Wedding::Model::RSVP->new( mysql => shift->mysql ) };

get '/' => sub {
	my $c = shift;

	$c->render( template => 'index' );
};

get '/rsvp' => sub {
	my $c = shift;

	$c->render( json => $c->rsvp->rsvps );
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
