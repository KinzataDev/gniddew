var global_modal_callback = {
    callback: function() {}
};

var RSVPErrorModal = React.createClass({
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
					<Modal.Title id="contained-modal-title">Error</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Alert bsStyle="danger">
						{this.props.content}
					</Alert>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={close}>Sorry!</Button>
				</Modal.Footer>
			</Modal>
			</div>
		);
  	}
});

var RSVPForm = React.createClass({
	getInitialState: function() {
		return { rsvp_code: '' };
	},
	handleCodeChange: function(e) {
		this.setState({rsvp_code: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var rsvp_code = this.state.rsvp_code.trim();
		if( !rsvp_code ) {
			return;
		}
		console.log( rsvp_code );
		this.setState({rsvp_code: ''});

		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  type: 'POST',
		  data: { rsvp_code: rsvp_code },
		  success: function(data) {
			window.alert("success");
		  }.bind(this),
		  error: function(xhr, status, err) {
			  if( xhr.status == 404 ) {
				  this.setState({errString: err.toString()});
				  ReactDOM.render(
				  	<RSVPErrorModal content={this.state.errString}/>,
					document.getElementById('error-modal')
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
				</div>
				<div className="form-group">
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
