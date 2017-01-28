var DetailsContent = React.createClass({
  render: function() {
    var cuvee_link = "https://www.google.com/maps/place/Cuvee/@43.032052,-87.907477,15z/data=!4m5!3m4!1s0x0:0x4872d2855f5a246f!8m2!3d43.032052!4d-87.9074774?hl=en-US";
    var parking_link = "https://www.google.com/maps/place/225+E+Chicago+St,+Milwaukee,+WI+53202/@43.032557,-87.90891,15z/data=!4m5!3m4!1s0x880519a465863183:0x620f67f50831633a!8m2!3d43.0325565!4d-87.90891?hl=en-US";

    return (
      <div className="buffer">
        <div className="row">
            <div className="col-xs-5 detail-content expand-small">
              <h2>Cuvee Champagne Lounge</h2>
              <h4>177 North Broadway, 3rd Floor</h4>
              <p>Ceremony at 4:30pm<br/>
              Cocktail hour and dinner to immediately follow
              </p>
              <a className="map-button hidden-large" href={cuvee_link}>MAP</a>
            </div>
            <div className="col-xs-7 hidden-small">
              <iframe
                width="450"
                height="250"
                src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBiHjleP09CeFXW8mlt1XwY-1cHjZEZzJU&q=Cuvee,Milwaukee,WI">
              </iframe>
            </div>
        </div>

        <div className="row">
            <div className="col-xs-5 detail-content expand-small">
              <h2>Parking</h2>
        			<p>There are two parking structures located near Cuvee: 212 N. Milwaukee St and 225 E. Chicago St.  The cost to park is approximately $10.00.</p>
        			<p>
              The <b><a href="http://www.historicthirdward.org/events/thirdwardartfestival.php">3rd Ward Art Festival</a></b> will be happening <b>during</b> our wedding and
              will take place on the street in front of Cuvee.  Street parking will be limited so please give yourself
              enough time to find parking if you will not be using the structure.  The festival is free - feel welcome to arrive early and browse the artwork!
        			</p>
              <a className="map-button hidden-large" href={parking_link}>MAP</a>
            </div>
            <div className="col-xs-7 hidden-small">
        			<iframe
        			  width="450"
        			  height="250"
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
