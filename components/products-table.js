// VENDOR LIBS
var React = require('react');
var _ = require('lodash');

var ProductsTable = React.createClass({

    propTypes: {
        filter: React.PropTypes.shape({
            filterText: React.PropTypes.string,
            showOnlyStockedProducts: React.PropTypes.bool
        }),
        products: React.PropTypes.array
    },

    getDefaultProps: function () {
        return {
            products: []
        };
    },

    render: function () {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getFilteredProducts().map(this.renderProduct)}
                </tbody>
            </table>
        );
    },

    renderProduct: function (product, index) {
        return (
            <tr key={index}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>$ {product.price}</td>
            </tr>
        );
    },

    getFilteredProducts: function () {
        var filter = this.props.filter;

        var filteredProducts = _.filter(this.props.products, function (product) {
            var containsFilterText = (product.name.toUpperCase().indexOf(filter.filterText.toUpperCase()) !== -1);

            return (containsFilterText && !(filter.showOnlyStockedProducts && !product.stock));
        });

        return filteredProducts;
    }

});

module.exports = ProductsTable;