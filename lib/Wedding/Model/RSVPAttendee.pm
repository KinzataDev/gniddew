package Wedding::Model::RSVPAttendee;
use Mojo::Base -base;

no warnings 'qw';

has 'firebase';

sub rsvp_attendees { shift->firebase->get('attendees'); }

#sub rsvp_attendees_by_rsvp {
#    my ( $self, $rsvp_code ) = @_;
#
#    return $self->mysql->db->query(    #
#		qq{
#          SELECT * FROM rsvp_attendee a
#          JOIN rsvp r ON (r.rsvp_id = a.rsvp_id)
#          WHERE r.rsvp_code = ?
#		},
#        $rsvp_code
#    );
#}

1;
