package Wedding::Config;

use Moose;
use MooseX::ClassAttribute;
use namespace::autoclean;

use Config::General;

class_has '_config' => (
	is		=> 'ro',
	isa		=> 'HashRef',
	lazy    => 1,
	default => sub {
		my %hash = Config::General->new("wedding.conf")->getall();
		return \%hash;
	},
);

1;
