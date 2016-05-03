package Wedding;

use Moose;
use MooseX::ClassAttribute;
use namespace::autoclean;

use Mojo::mysql;
use Wedding::Config;

class_has '_schema' => (
	is		=> 'ro',
	isa		=> 'DBIx::Class::Schema',
	lazy    => 1,
	default => sub {
		require Wedding::Schema;
		return Wedding::Schema->connect( @{Wedding::Config->_config->{orm_connect_info}} );
	},
);

class_has '_mysql' => (
	is		=> 'ro',
	isa		=> 'Mojo::mysql',
	lazy    => 1,
	default => sub {
				my $config = Wedding::Config->_config->{connect_info};
                return Mojo::mysql->new(
                    sprintf(
                        'mysql://%s:%s@%s',    #
                        $config->{user},
                        $config->{pass},
                        $config->{db},
                    )
                );
	},
);
1;
