var React = require('react/addons');
var ComponentPropType = require('react-pick/lib/helpers/ComponentPropType');

var {PureRenderMixin} = React.addons;

var moment = require('moment');

var CalendarHeader = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    getHeadingId: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    month: React.PropTypes.object.isRequired,
    buttonComponent: ComponentPropType
  },

  getDefaultProps: function() {
    return {
      buttonComponent: 'button'
    };
  },

  handleNextButtonClick: function() {
    this.props.onMonthChange(moment(this.props.month).add(1, 'months'));
  },

  handlePreviousButtonClick: function() {
    this.props.onMonthChange(moment(this.props.month).subtract(1, 'months'));
  },

  render: function() {
    var ButtonComponent = this.props.buttonComponent;
    var {getHeadingId, month, ...otherProps} = this.props;

    return (
      <div {...otherProps} className="CalendarHeader">
        <ButtonComponent 
          className="CalendarHeader-previousButton"
          onClick={this.handlePreviousButtonClick}
          tabIndex="0">
          &#9664;
        </ButtonComponent>

        <ButtonComponent 
          className="CalendarHeader-nextButton"
          onClick={this.handleNextButtonClick}
          tabIndex="0">
          &#9654;
        </ButtonComponent>
        
        <div 
          aria-live="assertive"
          aria-atomic="true"
          className="CalendarHeader-heading"
          id={getHeadingId()}
          role="heading">
          {month.format('MMMM YYYY')}
        </div>
      </div>
    );
  }

});

module.exports = CalendarHeader;