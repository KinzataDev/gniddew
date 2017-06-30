package Wedding::Model::RSVP;

use Mojo::Base -base;
use Wedding::Model::RSVPAttendee;
use Wedding;
use Wedding::Config;

use Email::Sender::Simple qw(sendmail);
use Email::Simple;
use Email::Simple::Creator;

has 'firebase';

sub rsvps { return shift->firebase->get('rsvp'); }
sub rsvp {
	my $self = shift;
	my $rsvp_code = shift;

	return $self->firebase->get('rsvp/' . $rsvp_code);
}

sub post_response {
    my $self      = shift;
    my $rsvp_code = shift;
    my $data      = shift;

	my $attendee_count = $data->{attendee_count};
	if( $attendee_count == 0 ) {
		$data->{is_coming} = 0;
	}
	else {
		$data->{is_coming} = 1;
	}

	$data->{has_responded} = 1;

	$self->firebase->patch("rsvp/$rsvp_code", {
		has_responded => $data->{has_responded},
		is_coming => $data->{is_coming},
		attendees => $data->{attendee_names},
		dietary   => $data->{dietary} // "N/A",
		kids      => $data->{kids} // "N/A"
	});

	foreach my $key ( keys %{$data->{attendee_names}} ) {
		my $name = $data->{attendee_names}{$key};
		my $attendee_data = {
			rsvp_code => $rsvp_code,
			display_name => $name,
			rsvp_code_url => "rsvp/$rsvp_code"
		};

		$self->firebase->patch("attendees/$name", $attendee_data);
	}

	$self->email_response_info( $data );
	return 1;
}

sub email_response_info {
	my $self = shift;
	my $data = shift;

	# Return if disabled
	return unless $self->firebase->get('config')->{is_email_enabled};

	my $config = Wedding::Config->_config;

	my $rsvp_code = $data->{rsvp_code};
	my @names;
	foreach my $obj (keys %{$data->{attendee_names}}) {
		push @names, $data->{attendee_names}->{$obj};
	}
	my $name_string = join "\n\t\t", @names;
	my $make_it = $data->{is_coming} ? "Yes":"No";
	my $dietary = $data->{dietary} // "No restrictions";
	my $kids    = $data->{kids} // "None";

	my $body = <<"END_MESSAGE";
RSVP response received:

	RSVP Code:             $rsvp_code
	Can they make it:      $make_it
	Dietary restrictions:   $dietary
	Kids meals:               $kids
	Attendees:
		$name_string
END_MESSAGE

	my $email = Email::Simple->create(
	  header => [
		To      => $config->{email_to_header},
		From    => $config->{email_from_header},
		Subject => "Wedding RSVP from $rsvp_code",
	  ],
	  body => $body,
	);

	sendmail($email);


}

1;
