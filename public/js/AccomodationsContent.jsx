var AccomodationsContent = React.createClass({

  render: function() {
	var hotel_rows = [];
	var hotel_data = [
		{
			name: "The Pfister Hotel",
			advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d101022-Reviews-The_Pfister_Hotel-Milwaukee_Wisconsin.html",
			hotel_url: "http://www.thepfisterhotel.com/?utm_campaign=TripAdvisor&utm_medium=online_listing&utm_source=business_listing&utm_content=hotel_website",
			blurb: "Expensive but I've never heard anything bad about the place.  Probably one of the nicest hotels in Milwaukee."
		},
		{
			name: "Hilton Garden Inn",
			advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d3369217-Reviews-Hilton_Garden_Inn_Milwaukee_Downtown-Milwaukee_Wisconsin.html",
			hotel_url: "http://hiltongardeninn3.hilton.com/en/hotels/wisconsin/hilton-garden-inn-milwaukee-downtown-MKEMDGI/index.html?WT.mc_id=zLADA0WW1GI2OLX3DA4HWB5TABL6MKEMDGI",
			blurb: "One of the closer hotels to Cuvee, would be walkable for those that want to."
		},
		{
			name: "The Plaza Hotel",
			advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d503651-Reviews-The_Plaza_Hotel-Milwaukee_Wisconsin.html",
			hotel_url: "https://plazahotelmilwaukee.com/?WT_srch=1&WT_mc_id=PPC2P&DCSext_ppc_kw=the%20plaza%20hotel%20milwaukee&ppc_ac=Brand&ppc_ag=Brand%20Phrase&ppc_mt=Phrase&platform=c",
			blurb: "They have an amazing breakfast.  I'd recommend getting breakfast here even if you're staying somewhere else, or even at home!"
		},
		{
			name: "County Clare",
			advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d83555-Reviews-County_Clare_Irish_Inn_and_Pub-Milwaukee_Wisconsin.html",
			hotel_url: "http://www.countyclare-inn.com/",
			blurb: "It's an Irish inn and pub.  What's not to like?"
		},
		{
			name: "The Kimpton Journeyman Hotel",
			advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d10061230-Reviews-The_Kimpton_Journeyman_Hotel-Milwaukee_Wisconsin.html",
			hotel_url: "http://www.journeymanhotel.com/",
			blurb: "Brand new (as of July 2016).  Including here because it is directly across from Cuvee."
		}
	];

	hotel_data.map(function(row){
		hotel_rows.push(
			<div class="hotel-row">
			<h4>{row.name}</h4>
			<p>
			<a href={row.advisor_url}>Trip Advisor</a> | <a href={row.hotel_url}>Website</a><br/>
			{row.blurb}
			</p>
			<hr/>
			</div>
		);
		return;
	});

    return (
      <div className="col-xs-12 buffer">
        <h2>Hotels Nearby</h2>
        <p>
			There are many hotels in downtown Milwaukee.  Here are a few but they may not be the closest.  Just the top listed Trip Advisor hotels.
		</p>
		<div class="hotel-info">
		<hr/>
		{hotel_rows}
		</div>

        <h2>Activity Suggestions</h2>
        <p>Todo</p>
      </div>
    );
  }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.AccomodationsContent = AccomodationsContent;
