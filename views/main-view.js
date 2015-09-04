// VENDOR LIBS
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var classNames = require('classnames');

var ProductListView = require('./product-list-view');

var MainVIew = React.createClass({

    render: function () {
        return (
            <div {...this.getProps()}>
                <div className="row" >
                    <div className="col-md-6">
                        <ProductListView />
                    </div>
                    <div className="col-md-6">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    },

    getProps: function () {
        return {
            className: this.getClass()
        };
    },

    getClass: function () {
        var classes = {
            'products-store': true,
            'container': true
        };

        return classNames(classes);
    }

});

module.exports = MainVIew;