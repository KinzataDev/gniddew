use utf8;
package Wedding::Schema::Result::Rsvp;

# Created by DBIx::Class::Schema::Loader
# DO NOT MODIFY THE FIRST PART OF THIS FILE

=head1 NAME

Wedding::Schema::Result::Rsvp

=cut

use strict;
use warnings;

use base 'DBIx::Class::Core';

=head1 TABLE: C<rsvp>

=cut

__PACKAGE__->table("rsvp");

=head1 ACCESSORS

=head2 id

  data_type: 'integer'
  is_auto_increment: 1
  is_nullable: 0

=head2 rsvp_code

  data_type: 'integer'
  is_nullable: 0

=head2 has_responded

  data_type: 'tinyint'
  default_value: 0
  is_nullable: 0

=cut

__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_auto_increment => 1, is_nullable => 0 },
  "rsvp_code",
  { data_type => "integer", is_nullable => 0 },
  "has_responded",
  { data_type => "tinyint", default_value => 0, is_nullable => 0 },
);

=head1 PRIMARY KEY

=over 4

=item * L</id>

=back

=cut

__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.07045 @ 2016-04-27 20:21:35
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:FSbe361rGV+QiY3WYdGG/A


# You can replace this text with custom code or comments, and it will be preserved on regeneration
1;
