var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var inherits = require('inherits');
var actions = require('./products-store-actions');

var ProductsStore = function () {
    this.state = this.getInitialState();
};

inherits(ProductsStore, EventEmitter);

ProductsStore.prototype.getInitialState = function () {
    return {
        products: []
    };
};

ProductsStore.prototype.getProducts = function () {
    return this.state.products;
};

ProductsStore.prototype.addProduct = function (product) {
    this.setState({products: this.state.products.concat([product])});
};

ProductsStore.prototype.setState = function (newState, callback) {
    _.extend(this.state, newState);

    this.emit(actions.CHANGE_EVENT);

    if (callback) {
        callback();
    }
};

ProductsStore.prototype.addActionListener = function(action, callback) {
    this.on(action, callback);
};

ProductsStore.prototype.removeActionListener = function(action, callback) {
    this.removeListener(action, callback);
};

module.exports = new ProductsStore();