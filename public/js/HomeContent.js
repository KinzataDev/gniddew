var HomeContent = React.createClass({
    render: function () {

        return (
            <div>
                <div className="col-xs-12 buffer">
                    <img className="core-img" src="img/ASP-RME16-105-cropped.jpg"></img>
                    <hr/>
                    <h2>Please join us for our wedding celebration</h2>
                    <h1 className="date">September 2nd, 2017</h1>

                    <img className="cat-img" src="img/cats-01.png"></img>

                </div>
            </div>
        );
    }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.HomeContent = HomeContent;
