var RSVPModal = React.createClass({
	getInitialState() {
    	return { show: false };
  	},
 	render() {
		var Alert = ReactBootstrap.Alert;
		var Modal = ReactBootstrap.Modal;
		var Button = ReactBootstrap.Button;

		return (
			<Modal
				show={this.props.show}
				onHide={this.props.closeHandler}
				container={this.parent}
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
		);
  	}
});

var RSVPForm = React.createClass({
	getInitialState: function() {
		return {
			rsvp_code         : '',
			attendee_count    : -1,
			attendee_names    : {},
			allowedGuestCount : -1,
			codeShow          : true,
			formShow          : false,
			submitShow        : false,
			dietary						: false,
			dietary_note			: '',
			kids							: false,
			kids_note					: '',
		};
	},
	setRsvpState: function(e) {
		if( e == "Start" ) {
			this.setState({ codeShow: true, formShow: false, submitShow: false });
		}
		if( e == "Form" ) {
			this.setState({ codeShow: false, formShow: true, submitShow: false });
		}
		if( e == "Submit" ) {
			this.setState({ codeShow: false, formShow: true, submitShow: true });
		}
	},
	resetState: function(e) {
		this.setState(this.getInitialState());
	},
	handleCodeChange: function(e) {
		this.setState({rsvp_code: e.target.value});
	},
	handleCountChange: function(e) {
		this.setState({attendee_count: e.target.value});
    this.setRsvpState("Submit");
	},
	handleAttendeeChange: function(e) {
		var names = this.state.attendee_names;
		names[e.target.id] = e.target.value;
		this.setState({attendee_names: names});
	},
	handleDietaryChange: function(e) {
		this.setState({dietary: e.target.value});
	},
	handleDietaryNoteChange: function(e) {
		this.setState({dietary_note: e.target.value});
	},
	handleKidsChange: function(e) {
		this.setState({kids: e.target.value});
	},
	handleKidsNoteChange: function(e) {
		this.setState({kids_note: e.target.value});
	},
  handleModalClose: function(e) {
    this.setState({modalShow: false})
  },
	handleCodeCheck: function(e) {
		e.preventDefault();
		var rsvp_code = this.state.rsvp_code.trim();
		if( !rsvp_code ) {
			return;
		}
		console.log( rsvp_code );
		var get_url = this.props.code_url + '/' + rsvp_code;

		$.ajax({
		  url: get_url,
		  dataType: 'json',
		  type: 'GET',
		  success: function(data) {
			  console.log(data);
			  if( data != null ) {
			  	this.setState({allowedGuestCount: data.guest_count});
          this.setRsvpState("Form");
			  }
			  else {
        	this.setState({modalShow: true});
				  this.setState({modalContent: "RSVP Code could not be found"});
          this.setState({modalAlert: "danger"});
          this.setState({modalTitle: "Error"});
          this.setState({modalCloseButton: "Sorry!"});
					this.setState({rsvp_code: ''});
          this.setRsvpState("Start");
			  }
		  }.bind(this),
		  error: function(xhr, status, err) {
			  if( xhr.status != 200 ) {
        		this.setState({modalShow: true});
				  	this.setState({modalContent: err.toString()});
          	this.setState({modalAlert: "danger"});
          	this.setState({modalTitle: "Error"});
          	this.setState({modalCloseButton: "Sorry!"});
          	this.setRsvpState("Start");
			  }
			console.error(get_url, status, err.toString());
		  }.bind(this)
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var rsvp_code = this.state.rsvp_code.trim();
		var attendee_count = this.state.attendee_count;
		var attendee_names = JSON.stringify(this.state.attendee_names);
		var dietary = this.state.dietary;
		var kids = this.state.kids;
		if( !rsvp_code ) {
			return;
		}
		if( attendee_count == -1 ) {
			return;
		}
		if( dietary ) {
			dietary = this.state.dietary_note;
		}
		if( kids ) {
			kids = this.state.kids_note;
		}
		console.log( rsvp_code );
		console.log( attendee_count );
		console.log( attendee_names );
		console.log( dietary );
		console.log( kids );

		$.ajax({
		  url: this.props.submit_url,
		  dataType: 'json',
		  type: 'POST',
		  data: {
				rsvp_code: rsvp_code,
				attendee_count: attendee_count,
				attendee_names: attendee_names,
				dietary: dietary,
				kids: kids
			},
		  success: function(data) {
			  console.log(data);
			  this.setState({modalShow: true});
			  this.setState({modalAlert: "success"});
			  this.setState({modalTitle: "Success"});
			  if( attendee_count == 0 ) {
				  this.setState({modalContent: "Sorry to hear you won't be making it!"});
				  this.setState({modalCloseButton: "We'll have a pint for you."});
			  }
			  else {
				  this.setState({modalContent: "Thank you for submitting your RSVP!"});
				  this.setState({modalCloseButton: "Woo wedding!"});
			  }
			  this.resetState();
		  }.bind(this),
		  error: function(xhr, status, err) {
			  if( xhr.status != 200 ) {
        		this.setState({modalShow: true});
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
		return (
			<div className="buffer">
				<h3 className="page-header">Actual invitations will be sent out summer 2017!</h3>
			</div>
		);
		var name_rows = [];
		var option_rows = [];

		var value_lookup = [
			"",
			"One",
			"Two",
			"Three",
			"Four",
			"Five",
			"Six",
			"Seven"
		];

		if( this.state.allowedGuestCount > 0 ) {
			option_rows.push( <option value="-1" key="option_-1">How many attendees?</option> );
			option_rows.push( <option value="0" key="option_0">We will not be attending</option> );
			for( var i=1; i <= this.state.allowedGuestCount; i++ ) {
				var key = "option" + (i); // First name is 0th record
				option_rows.push(<option value={i} key={key}>{value_lookup[i]}</option>);
			}
		}

		if( this.state.attendee_count > 0 ) {
			for( var i=0; i<this.state.attendee_count; i++ ) {
				var key = "name_" + (i+1); // First name is 0th record
				name_rows.push(<input required pattern="^\w+ \w+$" title="First Last" type="text" className="form-control" onChange={this.handleAttendeeChange} key={key} id={key}/>);
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
				{ this.state.codeShow ?
				<form className="rsvpCodeForm" onSubmit={this.handleCodeCheck}>
					<label>Enter RSVP Code</label>
					<input
						type="text"
						className="form-control"
						placeholder="RSVP Code"
						value={this.state.rsvp_code}
						onChange={this.handleCodeChange}
					/>
					<input type="submit" value="Validate RSVP Code"/>
				</form>
				: null
				}
				{this.state.formShow ?
				<form className="rsvpForm" onSubmit={this.handleSubmit} >
					<div className="form-group">
						<label>Please select the number of attendees</label>
						<select type="select" className="form-control" onChange={this.handleCountChange} key="count">
							{option_rows}
						</select>
						{ this.state.attendee_count > 0
							?
							<div>
								<label>Please enter first and last names.</label>
								{name_rows}
								Please note the dinner will be buffet-style, no meal choice is required.
								<label>Does any attendee have a special dietary requirement?</label>
								<div className="input-group">
									<input type="radio" name="dietary" value="false" onChange={this.handleDietaryChange}/>No
									<input type="radio" name="dietary" value="true" onChange={this.handleDietaryChange}/>Yes
									{ this.state.dietary == "true" ?
										<input
											type="text"
											placeholder="Dietary notes..."
											value={this.state.dietary_note}
											onChange={this.handleDietaryNoteChange}
										/>
										: null
									}
								</div>

								<label>Would any attendee prefer a kid's meal?</label>
								<div className="input-group">
									<input type="radio" name="kids" value="false" onChange={this.handleKidsChange}/>No
									<input type="radio" name="kids" value="true" onChange={this.handleKidsChange}/>Yes
									{ this.state.kids == "true" ?
										<input
											type="text"
											placeholder="How many?"
											value={this.state.kids_note}
											onChange={this.handleKidsNoteChange}
										/>
										: null
									}
								</div>
							</div>
							: null
						}
						{ this.state.submitShow ?
						<input type="submit" value="Send RSVP"/>
						: null }
					</div>
				</form>
				: null }
			</div>
			<div className="col-xs-2"></div>
			</div>
		);
	}
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.RSVPForm = RSVPForm;
