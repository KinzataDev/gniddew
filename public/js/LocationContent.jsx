var LocationContent = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 buffer">
        <h2>Cuvee Champagne Lounge</h2>
        <div className="row">
          <div className="col-xs-6 vertical-split-right">
            <h3>Google Map</h3>
            Embedded map goes here.
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
