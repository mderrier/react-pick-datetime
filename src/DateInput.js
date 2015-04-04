var DateInput = require('./DateInput');
var DateInputButton = require('./DateInputButton');
var DatePopup = require('./DatePopup');
var React = require('react/addons');
var {InputPopupWrapper} = require('react-pick');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var joinClasses = require('react/lib/joinClasses');

var DateInput = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    /**
     * Event handler fired when the value of the `<DateInput>` changes.
     * The called function is passed `value`.
     */
    onChange: React.PropTypes.func.isRequired,

    /**
     * The current value of the `<DateInput>`, as a `moment` date.
     */
    value: React.PropTypes.object,

    /**
     * The format of the date shown and parsed in the `<input> box.
     * Default is `'l'`.
     */
    inputValueFormat: React.PropTypes.string,

    /**
     * The component to render for the input.
     * Default is `input`.
     */
    inputComponent: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.function
    ]),

    /**
     * The component to render for the button that lets you toggle the popup.
     * Default is `DateInputButton`.
     */
    buttonComponent: React.PropTypes.func,

    /**
     * The component to render for the date popup.
     * Default is `DatePopup`.
     */
    popupComponent: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      value: null,
      inputValueFormat: 'l',
      inputComponent: 'input',
      buttonComponent: DateInputButton,
      popupComponent: DatePopup
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
    var InputComponent = this.props.inputComponent;
    var {className, ...otherProps} = this.props;

    return (
      <div className={joinClasses('DateInput', className)}>
        <InputPopupWrapper 
          isOpen={this.state.isOpen} 
          popupElement={this.renderPopup()}>
          <InputComponent
            {...otherProps}
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