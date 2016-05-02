DROP TABLE IF EXISTS rsvp;

CREATE TABLE rsvp
(
	rsvp_id int AUTO_INCREMENT PRIMARY KEY,
	rsvp_code INT NOT NULL,
	has_responded BOOL NOT NULL DEFAULT 0,
	is_coming BOOL,
	primary_contact varchar
);

CREATE TABLE rsvp_attendee
(
	rsvp_response_id int AUTO_INCREMENT PRIMARY KEY,
	rsvp_id INT NOT NULL,
	first_name varchar,
	last_name varchar,
	display_name varchar
);
