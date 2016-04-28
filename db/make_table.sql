DROP TABLE IF EXISTS rsvp;

CREATE TABLE rsvp
(
	id int AUTO_INCREMENT PRIMARY KEY,
	rsvp_code INT NOT NULL,
	has_responded BOOL NOT NULL DEFAULT 0
);
