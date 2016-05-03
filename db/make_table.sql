DROP TABLE IF EXISTS rsvp;
DROP TABLE IF EXISTS rsvp_attendee;

CREATE TABLE rsvp
(
	rsvp_id int AUTO_INCREMENT PRIMARY KEY,
	rsvp_code INT NOT NULL,
	has_responded BOOL NOT NULL DEFAULT 0,
	is_coming BOOL,
	primary_contact VARCHAR(50)
);

CREATE TABLE rsvp_attendee
(
	rsvp_response_id int AUTO_INCREMENT PRIMARY KEY,
	rsvp_id INT NOT NULL,
	first_name varchar(30),
	last_name varchar(30),
	display_name varchar(50)
);
