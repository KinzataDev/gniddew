var global_modal_callback = {
    callback: function() {}
};

var RSVPModal = React.createClass({
	componentWillMount() {
		global_modal_callback.callback = () => {
			this.setState({show:true});
		};
	},
	getInitialState() {
    	return { show: true };
  	},
  	render() {
		var Alert = ReactBootstrap.Alert;
		var Modal = ReactBootstrap.Modal;
		var Button = ReactBootstrap.Button;
		let close = () => {
			this.setState({show:false});
		}

		return (
			<div className="modal-container" style={{height: 200}}>
			<Modal
				show={this.state.show}
				onHide={close}
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
					<Button onClick={close}>{this.props.close}</Button>
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
			  this.setState({successString: "Thank you for submitting your RSVP!"});
			  ReactDOM.render(
			  	<RSVPModal content={this.state.successString} alert="success" title="Success" close="Thanks!"/>,
				document.getElementById('response-modal')
			  );
			  if( global_modal_callback ) {
				global_modal_callback.callback();
			  }
		  }.bind(this),
		  error: function(xhr, status, err) {
			  if( xhr.status != 200 ) {
				  this.setState({errString: err.toString()});
				  ReactDOM.render(
				  	<RSVPModal content={this.state.errString} alert="danger" title="Error" close="Sorry!"/>,
					document.getElementById('response-modal')
				  );
				  if( global_modal_callback ) {
					global_modal_callback.callback();
				  }
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
			<form className="rsvpForm" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="RSVP Code"
						value={this.state.rsvp_code}
						onChange={this.handleCodeChange}
					/>
					<select type="select" className="form-control" onChange={this.handleCountChange} key="count">
					    <option value="-1">How many attendees?</option>
					    <option value="0">We will not be attending</option>
					    <option value="1">One</option>
					    <option value="2">Two</option>
					    <option value="3">Three</option>
					</select>
					{rows}
					<input type="submit" className="btn btn-primary" value="Send RSVP"/>
				</div>
			</form>
		);
	}
});


ReactDOM.render(
  <RSVPForm url="/rsvpsubmit"/>,
  document.getElementById('root')
);
