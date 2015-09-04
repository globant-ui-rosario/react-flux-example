// VENDOR LIBS
var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

var Checkbox = React.createClass({

    propTypes: {
        checked: React.PropTypes.bool,
        defaultChecked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getInitialState: function () {
        var initialState = {};

        if ((_.isUndefined(this.props.checked))) {
            initialState.checked = this.props.defaultChecked
        }

        return initialState;
    },

    render: function () {
        return (
            <label {...this.getProps()}>
                <input {...this.getInputProps()} />
                <span className="checkbox--child">
                    {this.props.children}
                </span>
            </label>
        );
    },

    getProps: function () {
        return {
            className: this.getClass()
        };
    },

    getInputProps: function () {
        return {
            checked: this.isChecked(),
            className: 'checkbox--input',
            onChange: this.handleInputChange,
            type: 'checkbox'
        };
    },

    getClass: function () {
        var classes = {
            'checkbox': true
        };

        classes[this.props.className] = (this.props.className);

        return classNames(classes);
    },

    isChecked: function () {
        return (_.isUndefined(this.props.checked)) ? this.state.checked : this.props.checked;
    },

    handleInputChange: function (event) {
        var props = this.props;

        if (_.isUndefined(props.checked)) {
            this.setState({checked: !this.state.checked});
        }

        if (props.onChange) {
            props.onChange(event);
        }
    }

});

module.exports = Checkbox;