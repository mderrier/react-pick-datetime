var DateInput = require('./DateInput');
var DateInputButton = require('./DateInputButton');
var DatePopup = require('./DatePopup');
var React = require('react/addons');
var {InputPopupWrapper} = require('react-pick');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var emptyFunction = require('react-pick/lib/helpers/emptyFunction');

var DateInput = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    buttonComponent: React.PropTypes.func,
    inputValueFormat: React.PropTypes.string,
    onChange: React.PropTypes.func,
    popupComponent: React.PropTypes.func,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      buttonComponent: DateInputButton,
      inputValueFormat: 'l',
      onChange: emptyFunction,
      popupComponent: DatePopup,
      value: null
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
    this.setState({
      inputValue: value.format(this.props.inputValueFormat),
      popupMonth: value || this.state.popupMonth
    });

    this.props.onChange(value);
  },

  handlePopupComplete: function(value) {
    this.handlePopupChange(value);
    this.setState({isOpen: false});
  },

  handlePopupCancel: function() {
    this.setState({isOpen: false});
  },

  handleInputChange: function(event) {
    var inputValue = event.target.value;
    var {inputValueFormat, onChange} = this.props;

    this.setState({inputValue});

    var parsedInputValue = moment(inputValue, inputValueFormat, true);
    if (parsedInputValue.isValid()) {
      this.setState({popupMonth: parsedInputValue});
      onChange(parsedInputValue);
    } else {
      onChange(null);
    }
  },

  handleButtonClick: function() {
    this.setState({isOpen: !this.state.isOpen}, () => {
      this.state.isOpen && this.refs['popup'].focusOnGrid();
    });
  },

  renderPopup: function() {
    var PopupComponent = this.props.popupComponent;

    return (
      <PopupComponent 
        ref="popup"
        month={this.state.popupMonth}
        value={this.props.value}
        onMonthChange={this.handlePopupMonthChange}
        onChange={this.handlePopupChange}
        onComplete={this.handlePopupComplete}
        onCancel={this.handlePopupCancel}
      />
    );
  },

  render: function() {
    var ButtonComponent = this.props.buttonComponent;

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
        <ButtonComponent
          aria-hidden="true" 
          onClick={this.handleButtonClick}
        />
      </div>
    );
  }

});

module.exports = DateInput;