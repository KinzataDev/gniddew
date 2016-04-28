package Wedding;

use Moose;
use MooseX::ClassAttribute;
use namespace::autoclean;

use Wedding::Config;

class_has '_schema' => (
	is		=> 'ro',
	isa		=> 'DBIx::Class::Schema',
	lazy    => 1,
	default => sub {
		require Wedding::Schema;
		return Wedding::Schema->connect( @{Wedding::Config->_config->{connect_info}} );
	},
);
1;
