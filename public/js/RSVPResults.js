var RSVPResults = React.createClass({
	getInitialState: function() {
		return {
			rsvp_data: []
		};
	},
	get_rsvp_data: function(e) {
		$.ajax({
			url: '/rsvp',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				this.setState({rsvp_data: data});
				console.log(data);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/rsvp', status, err.toString());
			}.bind(this),
		});
	},
	componentWillMount() {
		this.get_rsvp_data();
	},
	render: function() {
		var data_rows = [];
		console.log(this.state.rsvp_data);
		for(var key in this.state.rsvp_data) {
			var row = this.state.rsvp_data[key];
			var name_string = "";
			for( var name_key in row.attendees ) {
				var text = row.attendees[name_key] + "\n";
				name_string += text;
			}
			var is_coming_class = "";
			if( row.is_coming != undefined ) {
				is_coming_class = 'row-coming-' + row.is_coming;
			}
			data_rows.push(
			<tr key={key} className={is_coming_class}>
				<td>{key}</td>
				<td>{row.is_coming}</td>
				<td>{name_string}</td>
				<td>{row.dietary}</td>
				<td>{row.kids}</td>
			</tr>
			);
		}
		return (
			<div>
				<table className="table-bordered">
					<thead>
					<tr>
						<th>RSVP Code</th>
						<th>Coming?</th>
						<th>Attendee List</th>
						<th>Dietary</th>
						<th>Kids</th>
					</tr>
					</thead>
					<tbody>
					{data_rows}
					</tbody>
				</table>
			</div>
		);
	}
});

ReactDOM.render(
  <RSVPResults />,
  document.getElementById('admin-rsvp-root')
);

