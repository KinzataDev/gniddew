var AccomodationsContent = React.createClass({

    render: function () {
        var hotel_rows = [];
        var hotel_data = [
            {
                name: "The Pfister Hotel",
                address: "424 E Wisconsin Ave",
                advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d101022-Reviews-The_Pfister_Hotel-Milwaukee_Wisconsin.html",
                hotel_url: "http://www.thepfisterhotel.com/?utm_campaign=TripAdvisor&utm_medium=online_listing&utm_source=business_listing&utm_content=hotel_website",
                blurb: "Luxury hotel in the heart of Downtown Milwaukee.  One of the top hotels in the city!"
            },
            {
                name: "Hilton Garden Inn",
                address: "611 N Broadway",
                advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d3369217-Reviews-Hilton_Garden_Inn_Milwaukee_Downtown-Milwaukee_Wisconsin.html",
                hotel_url: "http://hiltongardeninn3.hilton.com/en/hotels/wisconsin/hilton-garden-inn-milwaukee-downtown-MKEMDGI/index.html?WT.mc_id=zLADA0WW1GI2OLX3DA4HWB5TABL6MKEMDGI",
                blurb: "Close to Cuvee, a walkable distance through the Third Ward shops."
            },
            {
                name: "The Plaza Hotel",
                address: "1007 N Cass St",
                advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d503651-Reviews-The_Plaza_Hotel-Milwaukee_Wisconsin.html",
                hotel_url: "https://plazahotelmilwaukee.com/?WT_srch=1&WT_mc_id=PPC2P&DCSext_ppc_kw=the%20plaza%20hotel%20milwaukee&ppc_ac=Brand&ppc_ag=Brand%20Phrase&ppc_mt=Phrase&platform=c",
                blurb: "A highly recommended breakfast by Max - stop here even if you're staying somewhere else!"
            },
            {
                name: "County Clare",
                address: "1234 N Astor St",
                advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d83555-Reviews-County_Clare_Irish_Inn_and_Pub-Milwaukee_Wisconsin.html",
                hotel_url: "http://www.countyclare-inn.com/",
                blurb: "Rachel's favorite Irish B&B.  The pub fare and cozy feeling is excellent."
            },
            {
                name: "The Kimpton Journeyman Hotel",
                address: "310 E Chicago St",
                advisor_url: "https://www.tripadvisor.com/Hotel_Review-g60097-d10061230-Reviews-The_Kimpton_Journeyman_Hotel-Milwaukee_Wisconsin.html",
                hotel_url: "http://www.journeymanhotel.com/",
                blurb: "A new boutique hotel located across from Cuvee.  It boasts a rooftop lounge and eclectic decor."
            }
        ];

        hotel_data.map(function (row) {
            hotel_rows.push(
                <div className="hotel-content" key={row.name}>
                    <h2>{row.name}</h2>
                    <h3>{row.address}</h3>
                    <a href={row.advisor_url}>Trip Advisor</a> | <a href={row.hotel_url}>Website</a><br/>
                    <p>{row.blurb}</p>
                </div>
            );
        });

        return (
            <div className="buffer">
                <h3 className="page-header">HOTELS NEARBY</h3>
                <p>
                    There are many hotels in Downtown Milwaukee - here are our top recommendations. (Please note we do
                    not have a hotel block)
                </p>
                <hr/>
                <div className="hotel-container">
                    {hotel_rows}
                </div>
            </div>
        );
    }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.AccomodationsContent = AccomodationsContent;
