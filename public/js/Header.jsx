var RSVPForm = window.__Wedding__.RSVPForm;
var HomeContent = window.__Wedding__.HomeContent;

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
				<Tab eventKey={2} title="RSVP" > <RSVPForm url="/rsvpsubmit" /></Tab>
			</Tabs>
		);
	}
});

ReactDOM.render(
  <NavBar />,
  document.getElementById('header-root')
);
