// VENDOR LIBS
var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

// STORES
var productsStore = require('../stores/products-store');

// COMPONENTS
var Checkbox = require('../components/checkbox');
var FormGroup = require('../components/form-group');
var Input = require('../components/input');
var ProductsTable = require('../components/products-table');

var ProductCreationView = React.createClass({

    getInitialState: function () {
        return this.getEmptyProduct();
    },

    render: function () {
        return (
            <form {...this.getFormProps()}>
                {this.renderNameInput()}
                {this.renderCategoryInput()}
                {this.renderPriceInput()}
                {this.renderStockInput()}
                {this.renderCreateButton()}
            </form>
        );
    },

    renderNameInput: function () {
        return (
            <FormGroup>
                <Input {...this.getNameInputProps()} />
            </FormGroup>
        );
    },

    renderCategoryInput: function () {
        return (
            <FormGroup>
                <Input {...this.getCategoryInputProps()} />
            </FormGroup>
        );
    },

    renderPriceInput: function () {
        return (
            <FormGroup>
                <Input {...this.getPriceInputProps()} />
            </FormGroup>
        );
    },

    renderStockInput: function () {
        return (
            <FormGroup>
                <Input {...this.getStockInputProps()} />
            </FormGroup>
        );
    },

    renderCreateButton: function () {
        return (
            <FormGroup>
                <button>Create product</button>
            </FormGroup>
        );
    },

    getFormProps: function () {
        return {
            className: this.getClass(),
            onSubmit: this.handleFormSubmit
        };
    },

    getNameInputProps: function () {
        return {
            value: this.state.name,
            onChange: this.handleNameInputChange
        };
    },

    getCategoryInputProps: function () {
        return {
            value: this.state.category,
            onChange: this.handleCategoryInputChange
        };
    },

    getPriceInputProps: function () {
        return {
            value: this.state.price,
            onChange: this.handlePriceInputChange
        };
    },

    getStockInputProps: function () {
        return {
            value: this.state.stock,
            onChange: this.handleStockInputChange
        };
    },

    getClass: function () {
        var classes = {
            'product-creation-view': true
        };

        return classNames(classes);
    },

    handleNameInputChange: function (event) {
        this.setState({name: event.target.value});
    },

    handleCategoryInputChange: function (event) {
        this.setState({category: event.target.value});
    },

    handlePriceInputChange: function (event) {
        this.setState({price: event.target.value});
    },

    handleStockInputChange: function (event) {
        this.setState({stock: event.target.value});
    },

    handleFormSubmit: function (event) {
        event.preventDefault();

        this.addProduct();
    },

    addProduct: function () {
        productsStore.addProduct(this.state);

        this.resetForm();
    },

    resetForm: function () {
        this.setState(this.getEmptyProduct());
    },

    getEmptyProduct: function () {
        return {
            name: '',
            category: '',
            price: 0,
            stock: 0
        };
    }

});

module.exports = ProductCreationView;