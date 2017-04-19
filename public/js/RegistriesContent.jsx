var RegistriesContent = React.createClass({
	getInitialState: function() {
		return {
			show_registry_page: 0
		};
	},
	get_config_data: function(e) {
		$.ajax({
			url: '/admin/config',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				this.setState({show_registry_page: data.show_registry_page});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error('/admin/config', status, err.toString());
			}.bind(this),
		});
	},
	componentWillMount() {
		this.get_config_data();
	},

	render: function() {
		if( !this.state.show_registry_page ) {
			return (
				<div className="buffer">
					<h3 className="page-header">REGISTERED AT</h3>
					<p>Please check back summer 2017!</p>
				</div>
			);
		}
		else {
			return (
				<div></div>
			);
		}
	}
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.RegistriesContent = RegistriesContent;
