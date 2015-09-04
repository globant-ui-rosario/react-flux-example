var React = require('react');
var classNames = require('classnames');

// STORES
var productsStore = require('../stores/products-store');

// Actions
var productsStoreActions = require('../stores/products-store-actions');

// COMPONENTS
var Checkbox = require('../components/checkbox');
var FormGroup = require('../components/form-group');
var Input = require('../components/input');
var ProductsTable = require('../components/products-table');

var ProductListView = React.createClass({

    getInitialState: function () {
        return {
            products: productsStore.getProducts(),
            filterText: '',
            showOnlyStockedProducts: false
        };
    },

    componentWillMount: function () {
        productsStore.addActionListener(productsStoreActions.CHANGE_EVENT, this.updateProducts);
    },

    componentWillUnmount: function () {
        productsStore.removeActionListener(productsStoreActions.CHANGE_EVENT, this.updateProducts);
    },

    render: function () {
        return (
            <div className={this.getClass()}>
                {this.renderFilterInput()}
                {this.renderStockOnlyCheckbox()}
                {this.renderProductsList()}
            </div>
        )
    },

    renderFilterInput: function () {
        return (
            <FormGroup>
                <Input {...this.getInputProps()}/>
            </FormGroup>
        );
    },

    renderStockOnlyCheckbox: function () {
        return (
            <FormGroup>
                <Checkbox {...this.getCheckboxProps()}>Show only stocked items</Checkbox>
            </FormGroup>
        );
    },

    renderProductsList: function () {
        return (<ProductsTable filter={this.state} products={this.state.products} />);
    },


    getInputProps: function () {
        return {
            value: this.state.filterText,
            onChange: this.handleInputChange
        };
    },

    getCheckboxProps: function () {
        return {
            checked: (this.state.showOnlyStockedProducts),
            onChange: this.handleCheckboxChange
        };
    },

    getClass: function () {
        var classes = {
            'product-list-view': true
        };

        return classNames(classes);
    },

    handleInputChange: function (event) {
        this.setState({filterText: event.target.value});
    },

    handleCheckboxChange: function () {
        this.setState({showOnlyStockedProducts: !this.state.showOnlyStockedProducts});
    },

    updateProducts: function () {
        this.setState({products: productsStore.getProducts()});
    }

});

module.exports = ProductListView;