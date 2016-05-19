var RSVPForm = window.__Wedding__.RSVPForm;
var HomeContent = window.__Wedding__.HomeContent;
var LocationContent = window.__Wedding__.LocationContent;
var TimelineContent = window.__Wedding__.TimelineContent;
var AccomodationsContent = window.__Wedding__.AccomodationsContent;
var RegistriesContent = window.__Wedding__.RegistriesContent;

var NavBar = React.createClass({
	getInitialState: function() {
		return { };
	},
	render: function() {
		var Tabs = ReactBootstrap.Tabs;
		var Tab = ReactBootstrap.Tab;
		return (
			<Tabs defaultActionKey={1} id="Main Tab" >
				<Tab eventKey={1} title="Home" > <HomeContent /></Tab>
				<Tab eventKey={2} title="Location" ><LocationContent /></Tab>
				<Tab eventKey={3} title="Timeline" ><TimelineContent /></Tab>
				<Tab eventKey={4} title="Accomodations" ><AccomodationsContent /></Tab>
				<Tab eventKey={5} title="Registries" ><RegistriesContent /></Tab>
 				<Tab eventKey={6} title="RSVP" > <RSVPForm url="/rsvpsubmit" /></Tab>
			</Tabs>
		);
	}
});

ReactDOM.render(
  <NavBar />,
  document.getElementById('header-root')
);
