var React = require('react');

var moment = require('moment');

var DatePopupHeader = React.createClass({

  propTypes: {
    getHeadingId: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    month: React.PropTypes.object.isRequired
  },

  handleNextButtonClick: function() {
    this.props.onMonthChange(moment(this.props.month).add(1, 'months'));
  },

  handlePreviousButtonClick: function() {
    this.props.onMonthChange(moment(this.props.month).subtract(1, 'months'));
  },

  render: function() {
    var {getHeadingId, month} = this.props

    return (
      <div className="DatePopupHeader">
        <button 
          className="DatePopupHeader-previousButton"
          onClick={this.handlePreviousButtonClick}
          tabIndex="0">
          &#9664;
        </button>

        <button 
          className="DatePopupHeader-nextButton"
          onClick={this.handleNextButtonClick}
          tabIndex="0">
          &#9654;
        </button>
        
        <div 
          aria-live="assertive"
          aria-atomic="true"
          className="DatePopupHeader-heading"
          id={getHeadingId()}
          role="heading">
          {month.format('MMMM YYYY')}
        </div>
      </div>
    );
  }

});

module.exports = DatePopupHeader;