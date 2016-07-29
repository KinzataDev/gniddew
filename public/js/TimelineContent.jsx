var TimelineContent = React.createClass({

  render: function() {
    var rows = [];
    var data = [
        {key:"1:30 PM",value: "Venue Setup"},
        {key:"3:30 PM",value: "Guests Arrive"},
        {key:"4:00 PM",value: "Ceremony"},
        {key:"4:30-5:30 PM",value: "Cocktail Hour & Photos"},
        {key:"5:25 PM",value: "Toasts/Dinner Announcement"},
        {key:"5:45 PM",value: "Cake Cutting"},
        {key:"6:00 PM",value: "Dinner Service"},
        {key:"8:00 PM",value: "First Dances"},
        {key:"11:00 PM",value: "Close"}
    ];

    data.map(function(row){
      var k = row.key;
      rows.push(
        <div className="row" key={row.key}>
          <div className="col-xs-6 vertical-split-right">
              {row.key}
          </div>
          <div className="col-xs-6 vertical-split-left">
            {row.value}
          </div>
        </div>
      );
      return;
    });

    return (
      <div className="col-xs-12 buffer">
        <h2>Day of Timeline</h2>
        {rows}
      </div>
    );
  }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.TimelineContent = TimelineContent;
