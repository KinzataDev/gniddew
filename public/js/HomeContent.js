var HomeContent = React.createClass({
	render: function() {

		return (
			<div>
			<div className="col-xs-12 buffer">
				<img className="core-img" src="http://placehold.it/900x400"></img>
				<hr/>
				<h3>Please join us for our wedding celebration</h3>
				<h2>September 2nd, 2017</h2>

				<p className="bg-brown">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum viverra urna ac blandit. Morbi odio lectus, euismod a elit in, tincidunt laoreet nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur a nisi elit. Praesent consectetur hendrerit interdum. Duis gravida orci lectus, at egestas neque imperdiet vitae. Pellentesque eget dolor sed urna condimentum luctus. Donec egestas eros nec tortor varius, in malesuada diam commodo.
				</p>

				<hr/>

				<img src="http://placehold.it/200x200"></img>

			</div>
			</div>
		);
	}
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.HomeContent = HomeContent;
