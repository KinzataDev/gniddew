package Wedding::Model::RSVP;

use Mojo::Base -base;

has 'mysql';

sub rsvps { shift->mysql->db->query('select * from rsvp')->hashes }

1;
