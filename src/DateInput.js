var DateInput = require('./DateInput');
var DateKeyBindings = require('./DateKeyBindings');
var DatePopup = require('./DatePopup');
var React = require('react/addons');
var {InputPopupWrapper} = require('react-pick');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var emptyFunction = require('react-pick/lib/helpers/emptyFunction');

var DateInput = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
    inputValueFormat: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      value: null,
      onChange: emptyFunction,
      inputValueFormat: 'l'
    };
  },

  getInitialState: function() {
    var {value, inputValueFormat} = this.props;

    return {
      isOpen: false,
      popupMonth: value || moment(),
      inputValue: (value !== null) ? value.format(inputValueFormat) : null
    };
  },

  handlePopupMonthChange: function(popupMonth) {
    this.setState({popupMonth});
  },

  handlePopupChange: function(value) {
    this.setState({inputValue: value.format(this.props.inputValueFormat)});
    this.props.onChange(value);
  },

  handlePopupComplete: function(value) {
    this.setState({
      isOpen: false,
      inputValue: value.format(this.props.inputValueFormat)
    });
    this.props.onChange(value)
  },

  handleInputChange: function(event) {
    var inputValue = event.target.value;
    this.setState({inputValue});

    var parsedInputValue = moment(inputValue, this.props.inputValueFormat);
    if (parsedInputValue.isValid()) {
      this.setState({popupMonth: parsedInputValue});
      this.props.onChange(parsedInputValue);
    } else {
      this.props.onChange(null);
    }
  },

  handleButtonClick: function() {
    this.setState({isOpen: !this.state.isOpen});
  },

  renderPopup: function() {
    return (
      <DatePopup 
        month={this.state.popupMonth}
        value={this.props.value}
        onMonthChange={this.handlePopupMonthChange}
        onChange={this.handlePopupChange}
        onComplete={this.handlePopupComplete}
      />
    );
  },

  render: function() {
    return (
      <div className="DateInput">
        <InputPopupWrapper 
          isOpen={this.state.isOpen} 
          popupElement={this.renderPopup()}>
          <input
            {...this.props}
            value={this.state.inputValue}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
          />
        </InputPopupWrapper>
        <span
          role="button"
          aria-hidden="true" 
          className="DateInput-button"
          onClick={this.handleButtonClick}>
          📅
        </span>
      </div>
    );
  }

});

module.exports = DateInput;