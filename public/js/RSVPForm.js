var RSVPModal = React.createClass({
	getInitialState() {
    	return { show: false };
  	},
  render() {
		var Alert = ReactBootstrap.Alert;
		var Modal = ReactBootstrap.Modal;
		var Button = ReactBootstrap.Button;

		return (
			//<div className="modal-container" style={{height: 200}}>
			<div className="modal-container" >
			<Modal
				show={this.props.show}
				onHide={this.props.closeHandler}
				container={this}
				aria-labelledby="contained-modal-title"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title">{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Alert bsStyle={this.props.alert}>
						{this.props.content}
					</Alert>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.closeHandler}>{this.props.close}</Button>
				</Modal.Footer>
			</Modal>
			</div>
		);
  	}
});

var RSVPForm = React.createClass({
	getInitialState: function() {
		return { rsvp_code: '', attendee_count: -1, attendee_names: {}};
	},
	handleCodeChange: function(e) {
		this.setState({rsvp_code: e.target.value});
	},
	handleCountChange: function(e) {
		this.setState({attendee_count: e.target.value});
	},
	handleAttendeeChange: function(e) {
		var names = this.state.attendee_names;
		names[e.target.id] = e.target.value;
		this.setState({attendee_names: names});
	},
  handleModalClose: function(e) {
    this.setState({modalShow: 0})
  },
	handleSubmit: function(e) {
		e.preventDefault();
		var rsvp_code = this.state.rsvp_code.trim();
		var attendee_count = this.state.attendee_count;
		var attendee_names = JSON.stringify(this.state.attendee_names);
		if( !rsvp_code ) {
			return;
		}
		if( attendee_count == -1 ) {
			return;
		}
		console.log( rsvp_code );
		console.log( attendee_count );
		console.log( attendee_names );

		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  type: 'POST',
		  data: { rsvp_code: rsvp_code, attendee_count: attendee_count, attendee_names: attendee_names },
		  success: function(data) {
        this.setState({modalShow: 1});
			  this.setState({modalContent: "Thank you for submitting your RSVP!"});
        this.setState({modalAlert: "success"});
        this.setState({modalTitle: "Success"});
        this.setState({modalCloseButton: "Thanks!"});
		  }.bind(this),
		  error: function(xhr, status, err) {
			  if( xhr.status != 200 ) {
          this.setState({modalShow: 1});
				  this.setState({modalContent: err.toString()});
          this.setState({modalAlert: "danger"});
          this.setState({modalTitle: "Error"});
          this.setState({modalCloseButton: "Sorry!"});
			  }
			console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
	},
	render: function() {
		var rows = [];
		if( this.state.attendee_count > 0 ) {
			for( var i=0; i<this.state.attendee_count; i++ ) {
				var key = "name_" + (i+1); // First name is 0th record
				rows.push(<input type="text" className="form-control" onChange={this.handleAttendeeChange} key={key} id={key}/>);
			}
		}
		return (
			<div>
			<RSVPModal
        show={this.state.modalShow}
        content={this.state.modalContent}
        alert={this.state.modalAlert}
        title={this.state.modalTitle}
        close={this.state.modalCloseButton}
        closeHandler={this.handleModalClose}
      />
			<div className="col-xs-2"></div>
			<div className="col-xs-8">
				<form className="rsvpForm" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Enter RSVP Code</label>
						<input
							type="text"
							className="form-control"
							placeholder="RSVP Code"
							value={this.state.rsvp_code}
							onChange={this.handleCodeChange}
						/>
						<label>Please select the number of attendees</label>
						<select type="select" className="form-control" onChange={this.handleCountChange} key="count">
							<option value="-1">How many attendees?</option>
							<option value="0">We will not be attending</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
						{rows}
						<input type="submit" value="Send RSVP"/>
					</div>
				</form>
			</div>
			<div className="col-xs-2"></div>
			</div>
		);
	}
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.RSVPForm = RSVPForm;
