#! /usr/bin/env perl

use strict;
use warnings;

use Wedding;

my $schema = Wedding->_schema;

my $rsvp_rs = $schema->resultset('Rsvp');

$rsvp_rs->populate(
    [
        [qw( rsvp_code )],
        [ 100 ],
        [ 101 ],
        [ 102 ],
    ]
);
