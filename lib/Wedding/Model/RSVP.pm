package Wedding::Model::RSVP;

use Mojo::Base -base;

has 'mysql';

sub rsvps { shift->mysql->db->query('select * from rsvp')->hashes }

sub select {
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

    return $self->mysql->db->query(    #
        'UPDATE rsvp SET has_responded = 1 WHERE rsvp_code = ?',    #
        $rsvp_code,
    );
}

1;
