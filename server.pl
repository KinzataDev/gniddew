#!/usr/bin/env perl

use lib "$FindBin::Bin/lib";

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

helper mysql => sub { state $mysql = Wedding->_mysql };
helper rsvp_attendee => sub { state $rsvp_attendee = Wedding::Model::RSVPAttendee->new( mysql => shift->mysql ) };
helper rsvp => sub {
	my $self = shift;
    return state $rsvp = Wedding::Model::RSVP->new(
        mysql         => $self->mysql,
        rsvp_attendee => $self->rsvp_attendee
    );
};

get '/' => sub {
	shift->reply->static('index.html');
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
	my $res = $c->rsvp->select_with_rsvp_code($data->{rsvp_code});
	if( $res->affected_rows == 0 ) {
		$c->res->message('RSVP Code not found, please make sure you entered it correctly.');
		$c->rendered(404);
		return;
	}

	if( $res->hash->{has_responded} ) {
		$c->res->message('We already have an RSVP for this code.');
		$c->rendered(403);
		return;
	}

	$data->{rsvp_id} = $res->hash->{rsvp_id};

	# Post data
	$res = $c->rsvp->post_response($data->{rsvp_code} , $data);
	if( $res->affected_rows == 0 ) {
		$c->res->message('Something went wrong... Let Max know you (he) broke his website.');
		$c->rendered(500);
		return;
	}
	else {
    	$c->render( json => { status => 200, success => 1 } );
	}
};

app->start;
