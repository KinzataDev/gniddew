var DetailsContent = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 buffer">
        <h2>Cuvee Champagne Lounge</h2>
        <div className="row">
          <div className="col-xs-12">
            <p>Enter building, take elevator in the back to the third floor.</p>
            <iframe
              width="450"
              height="250"
              frameBorder="0" style={{border:0}}
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBiHjleP09CeFXW8mlt1XwY-1cHjZEZzJU&q=Cuvee,Milwaukee,WI">
            </iframe>
			<br/>
		  	<hr/>
            <h3>Parking Info</h3>
			<p>There is a major parking structure just around the corner from Cuvee.</p>

			<p>
			Information for this structure specifically is available <a href="http://www.parkmilwaukee.com/facilities/75-historic-third-ward-water-street-structure">here</a>.
			There is also potentially street parking in the area however the 3rd Ward Art Festival is taking place at the same time as our wedding, so parking may be tight.  Because of this event, rates at the structure may also be higher than posted on the site...
			</p>
			<iframe
			  width="450"
			  height="250"
			  frameBorder="0" style={{border:0}}
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBiHjleP09CeFXW8mlt1XwY-1cHjZEZzJU&q=225 E Chicago St, Milwaukee, WI 53202">
			</iframe>
          </div>
        </div>
      </div>
    );
  }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.DetailsContent = DetailsContent;
