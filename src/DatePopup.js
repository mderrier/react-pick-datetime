var DatePopupGrid = require('./DatePopupGrid');
var DatePopupHeader = require('./DatePopupHeader');
var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var getUniqueId = require('react-pick/lib/helpers/getUniqueId');

var DatePopup = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    month: React.PropTypes.object.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      value: null
    };
  },

  getInitialState: function() {
    return {
      id: getUniqueId('DatePopup') 
    };
  },

  getHeadingId: function() {
    return `${this.state.id}-heading`;
  },

  focusOnGrid: function() {
    this.refs['grid'].getDOMNode().focus();
  },

  render: function() {
    return (
      <div className="DatePopup">
        <DatePopupHeader
          {...this.props}
          getHeadingId={this.getHeadingId}
        />
        <DatePopupGrid
          {...this.props}
          ref="grid"
          aria-labelledby={this.getHeadingId()}
          tabIndex="0"
        />
      </div>
    );
  }

});

module.exports = DatePopup;