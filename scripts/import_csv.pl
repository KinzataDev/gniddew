#!/usr/bin/env perl

use lib "$FindBin::Bin/lib";
use lib "lib";
use lib "../local/lib/perl5";

use Getopt::Long::Descriptive;
use Path::Class::File qw/file/;
use Dir::Self;
use Try::Tiny;

use Firebase;
use Wedding::Config;

my ($opt, $usage) = describe_options(
  'import_csv %o <some-arg>',
  [ 'file|s=s', "the CSV file to import", { required => 1  } ],
  [],
  [ 'help',       "print usage message and exit", { shortcircuit => 1 } ],
);

if ( $opt->{help} ) {
  print $usage->text;
  exit;
}

sub parse_line {
  my $line = shift;

  # Split on commas, should get 2 values
  my @values = split (',', $line);
  if( scalar @values != 2 ) {
    die "Parsed data did not equate to two parts.";
  }

  return { code => $values[0], count => $values[1] };
}

sub patch_data {
  my $data = shift;

  my $config = Wedding::Config->_config;
  my $fb = Firebase->new(
      firebase => $config->{firebase_url},
      auth     => { secret => $config->{firebase_secret}, admin => \1 }
  );

  foreach my $row ( @{$data} ) {
    my $code = $row->{code};
    $fb->patch("rsvp/$code", {
  		guest_count => $row->{count}
  	});
  }
}

if( $opt->{file} ) {
  my $file = Path::Class::File->new( __DIR__ . '/' . $opt->{file} );
  my $fh = $file->openr() or die "File does not exist!";

  my $line_num = 0;
  my $patch_data = ();
  while( my $line = <$fh> ) {
    chomp $line;

    $line_num++;
    my $line_data = try {
      return parse_line( $line );
    }
    catch {
      die "Error parsing data on line $line_num => $_";
    };

    push @{$patch_data}, $line_data;
  }

  patch_data( $patch_data );
}

1;
