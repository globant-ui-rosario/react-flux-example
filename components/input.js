// VENDOR LIBS
var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

var Input = React.createClass({

    propTypes: {
        defaultValue: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ])
    },

    getInitialState: function () {
        var initialState = {};

        if ((_.isUndefined(this.props.value))) {
            initialState.value = this.props.defaultValue
        }

        return initialState;
    },

    render: function () {
        return (
            <input {...this.getProps()} />
        );
    },

    getProps: function () {
        return {
            value: this.getValue(),
            className: this.getClass(),
            onChange: this.handleOnChange
        };
    },

    getClass: function () {
        var classes = {
            'input': true
        };

        classes[this.props.className] = (this.props.className);

        return classNames(classes);
    },

    getValue: function () {
        return (_.isUndefined(this.props.value)) ? this.state.value : this.props.value;
    },

    handleOnChange: function (event) {
        var props = this.props;

        if (_.isUndefined(props.value)) {
            this.setState({value: event.target.value});
        }

        if (props.onChange) {
            props.onChange(event);
        }
    }

});

module.exports = Input;