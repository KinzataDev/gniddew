#!/usr/bin/env perl

use lib "$FindBin::Bin/lib";
use lib "lib";
use lib "./local/lib/perl5";

use Firebase;

use Mojo::UserAgent;
use Mojolicious::Lite;
use Mojo::Exception;
use Mojolicious::Static;
use Mojo::JSON qw/ encode_json decode_json/;
use Data::FormValidator;
use DDP;

use Wedding::Config;
use Wedding;

use Wedding::Model::RSVP;
use Wedding::Model::RSVPAttendee;


my $config = Wedding::Config->_config;
my $fb = Firebase->new(
    firebase => $config->{firebase_url},
    auth     => { secret => $config->{firebase_secret}, admin => \1 }
);

helper rsvp_attendee => sub {
	my $self = shift;
    return state $rsvp = Wedding::Model::RSVPAttendee->new(
		 firebase => $fb,
    );
};
helper rsvp => sub {
	my $self = shift;
    return state $rsvp = Wedding::Model::RSVP->new(
		 firebase => $fb,
    );
};

get '/' => sub {
	shift->reply->static('index.html');
};

get '/admin/rsvp_results' => sub {
	shift->reply->static('rsvp_results.html');
};

get '/inputdata' => sub {
	my $self = shift;

	$fb->patch('/', { rsvp =>
		{
			101 => { guest_count => 1 },
			102 => { guest_count => 2 },
			103 => { guest_count => 3 },
			104 => { guest_count => 4 },
			105 => { guest_count => 5 },
		}
	});
};

get '/rsvp' => sub {
	my $c = shift;

	$c->render( json => $c->rsvp->rsvps );
};

get '/rsvp/:id' => sub {
	my $c = shift;

	$c->render( json => $c->rsvp->rsvp($c->stash('id')));
};

get '/rsvpattendee' => sub {
	my $c = shift;

	$c->render( json => $c->rsvp_attendee->rsvp_attendees );
};

post '/rsvpsubmit' => sub {
	my $c = shift;

	my $data = $c->req->params->to_hash;
	$data->{attendee_names} = decode_json($data->{attendee_names});

	my $form_profile = {
		required => [
			qw/
				rsvp_code
				attendee_count
				attendee_names
			/
		],
    optional => [
      qw/
        dietary
        kids
      /
    ]
	};

	my $results = Data::FormValidator->check( $data, $form_profile );
	$data = $results->valid;
	my $success = $results->success;

	if( $success != 1) {
		$c->res->message('Something is missing... Let Max know his site is borked.');
		$c->rendered(500);
		return;
	}

	# Make sure that the row with that rsvp_code exists
	my $res = $c->rsvp->rsvp($data->{rsvp_code});
	if( !defined $res ) {
		$c->res->message('RSVP Code not found, please make sure you entered it correctly.');
		$c->rendered(404);
		return;
	}

	# Post data
	$res = $c->rsvp->post_response($data->{rsvp_code} , $data);
    $c->render( json => { status => 200, success => 1 } );
};

app->start;
