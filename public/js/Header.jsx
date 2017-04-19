var RSVPForm = window.__Wedding__.RSVPForm;
var HomeContent = window.__Wedding__.HomeContent;
var DetailsContent = window.__Wedding__.DetailsContent;
var AccomodationsContent = window.__Wedding__.AccomodationsContent;
var RegistriesContent = window.__Wedding__.RegistriesContent;

var NavBar = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        var Tabs = ReactBootstrap.Tabs;
        var Tab = ReactBootstrap.Tab;
        return (
            <Tabs defaultActionKey={1} id="Main Tab">
                <Tab eventKey={1} title="HOME"> <HomeContent /></Tab>
                <Tab eventKey={2} title="DETAILS"><DetailsContent /></Tab>
                <Tab eventKey={4} title="ACCOMODATIONS"><AccomodationsContent /></Tab>
                <Tab eventKey={5} title="REGISTRIES"><RegistriesContent /></Tab>
                <Tab eventKey={6} title="RSVP"> <RSVPForm code_url="/rsvp" submit_url="/rsvpsubmit"/></Tab>
            </Tabs>
        );
    }
});

ReactDOM.render(
    <NavBar />,
    document.getElementById('header-root')
);
