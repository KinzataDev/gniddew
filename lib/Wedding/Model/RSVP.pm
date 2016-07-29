package Wedding::Model::RSVP;

use Mojo::Base -base;
use Wedding::Model::RSVPAttendee;
use Wedding;

#has 'mysql';
#has 'rsvp_attendee';
has 'firebase';

sub rsvps { return shift->firebase->get('rsvp'); }
sub rsvp {
	my $self = shift;
	my $rsvp_code = shift;

	return $self->firebase->get('rsvp/' . $rsvp_code);
}

sub select_with_rsvp_code {
    my $self      = shift;
    my $rsvp_code = shift;

    return $self->mysql->db->query(    #
        'SELECT * FROM rsvp WHERE rsvp_code = ?',    #
        $rsvp_code
    );
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
		attendees => $data->{attendee_names}
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

	return 1;
}

1;
