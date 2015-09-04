// VENDOR LIBS
var React = require('react');

var FormGroup = React.createClass({

    render: function () {
        return (
            <div className="form-group">
                {this.props.children}
            </div>
        );
    }

});

module.exports = FormGroup;