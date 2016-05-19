var LocationContent = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 buffer">
        <h2>Cuvee Champagne Lounge</h2>
        <div className="row">
          <div className="col-xs-6 vertical-split-right">
            <p>Enter building, take elevator in the back to the third floor.</p>
            <iframe
              width="450"
              height="250"
              frameBorder="0" style={{border:0}}
              src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBiHjleP09CeFXW8mlt1XwY-1cHjZEZzJU&q=Cuvee,Milwaukee,WI">
            </iframe>
          </div>
          <div className="col-xs-6 vertical-split-left">
            <h3>Parking Info</h3>
            Parking info goes here
          </div>
        </div>
      </div>
    );
  }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.LocationContent = LocationContent;
