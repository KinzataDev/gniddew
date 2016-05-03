package Wedding::Model::RSVP;

use Mojo::Base -base;
use Wedding::Model::RSVPAttendee;

has 'mysql';
has 'rsvp_attendee';

#ee => sub { state $attendee = Wedding::Model::RSVPAttendee->new( mysql => shift->mysql ) };

sub rsvps { shift->mysql->db->query('select * from rsvp')->hashes }
sub rsvp {
	my $self = shift;
	my $rsvp_code = shift;
	return $self->mysql->db->query('select * from rsvp where rsvp_id = ?', $rsvp_code)->hash;
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

	my $rsvp_form = {
		required => [qw/
			has_responded
			is_coming
		/]
	};

	my $attendee_form = {
		required => [qw/
			rsvp_id
			first_name
			last_name
			display_name
		/]
	};

    my $info = $self->mysql->db->query(    #
		qq{
        UPDATE rsvp SET
			has_responded = ?,
			is_coming = ?
		WHERE rsvp_code = ?
		}
		,
		$data->{has_responded},
		$data->{is_coming},
        $rsvp_code,
    );

	foreach my $key ( keys %{$data->{attendee_names}} ) {
		my $name = $data->{attendee_names}{$key};
		my $attendee_data = {
			rsvp_id => $data->{rsvp_id},
			display_name => $name
		};

		$self->rsvp_attendee->insert($attendee_data);
	}

	return $info;
}

1;
