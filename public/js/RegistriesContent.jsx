var RegistriesContent = React.createClass({
    getInitialState: function () {
        return {
            show_registry_page: 0
        };
    },
    get_config_data: function (e) {
        $.ajax({
            url: '/admin/config',
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                this.setState({show_registry_page: data.show_registry_page});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('/admin/config', status, err.toString());
            }.bind(this),
        });
    },
    componentWillMount() {
        this.get_config_data();
    },

    render: function () {
        var registry_rows = [];
        var registry_data = [
            {
                name: "Sur la Table",
                logo: "/img/Sur-la-table-cropped.png",
                url: "https://www.surlatable.com/registry/giftRegistryList.jsp?id=2001792023441"
            },
            {
                name: "Target",
                logo: "/img/Target_logo.svg",
                url: "http://tgt.gifts/15813192b9dd41438ad49177869fb037"
            },
            {
                name: "Amazon",
                logo: "/img/Amazon_logo_plain.png",
                url: "https://www.amazon.com/wedding/maximilian-witte-rachel-dubinski-milwaukee-september-2017/registry/2CKN6G9EXQU75"
            },
        ];

        registry_data.map(function (row) {
            registry_rows.push(
                <a href={row.url} target="_blank" key={row.name}><img className="registry-img" src={row.logo} alt={row.name}/></a>
            );
        });

        if (!this.state.show_registry_page) {
            return (
                <div className="buffer">
                    <h3 className="page-header">REGISTERED AT</h3>
                    <p>Please check back summer 2017!</p>
                </div>
            );
        }
        else {
            return (
                <div className="buffer">
                    <h3 className="page-header">REGISTERED AT</h3>
                    <div className="registry-container">
                        {registry_rows}
                    </div>
                </div>

            );
        }
    }
});

window.__Wedding__ = window.__Wedding__ || {};
window.__Wedding__.RegistriesContent = RegistriesContent;
