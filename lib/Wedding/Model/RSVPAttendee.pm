package Wedding::Model::RSVPAttendee;
use Mojo::Base -base;

no warnings 'qw';

has 'mysql';

sub rsvp_attendees { shift->mysql->db->query('select * from rsvp_attendee')->hashes }

sub rsvp_attendees_by_rsvp {
    my ( $self, $rsvp_code ) = @_;

    return $self->mysql->db->query(    #
		qq{
          SELECT * FROM rsvp_attendee a
          JOIN rsvp r ON (r.rsvp_id = a.rsvp_id)
          WHERE r.rsvp_code = ?
		},
        $rsvp_code
    );
}

sub insert {
    my ( $self, $data ) = @_;

	my ($first_name, $last_name) = split(' ', $data->{display_name});

    return $self->mysql->db->query(    #
		qq{
          INSERT INTO rsvp_attendee ( rsvp_id, first_name, last_name, display_name )
          VALUES ( ?,?,?,? )
		},
        $data->{rsvp_id},
        $first_name,
        $last_name,
        $data->{display_name}
    );
}

1;
