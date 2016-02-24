var Calendar = require('./Calendar');
var CalendarToggleButton = require('./CalendarToggleButton');
var DateInput = require('./DateInput');
var React = require('react');
var {InputWithPopup} = require('react-pick-2');

var PureRenderMixin = require('react-addons-pure-render-mixin');
//var {PureRenderMixin} = React.addons;

var moment = require('moment');
var emptyFunction = require('react-pick-2/lib/helpers/emptyFunction');

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
     * Event handler fired when a new non-null value is selected and the 
     * popup closed. The called function is passed `value`.
     */
    onComplete: React.PropTypes.func,

    /**
     * The format of the date shown and parsed in the `<input> box.
     * Default is `'l'`.
     */
    inputValueFormat: React.PropTypes.string,

    /**
     * The component to render for the calendar in the popup.
     * Default is `Calendar`.
     */
    calendarComponent: React.PropTypes.func,

    /**
     * The component to render for the toggle button next to the input box.
     * Setting this to `null` hides the toggle button entirely.
     * Default is `CalendarToggleButton`.
     */
    calendarToggleButtonComponent: React.PropTypes.func,

    /**
     * The locale to be used for the format of the date. If you absolutely need 
     * to override the locale for some reason, use this.
     * Default is the browser's `window.navigator.language` value.
     */
    locale: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      value: null,
      inputValueFormat: 'l',
      onComplete: emptyFunction,
      inputComponent: 'input',
      calendarComponent: Calendar,
      calendarToggleButtonComponent: CalendarToggleButton,
      locale: window.navigator.userLanguage || window.navigator.language
    };
  },

  getInitialState: function() {
    var {value, locale, inputValueFormat} = this.props;

    return {
      isOpen: false,
      popupMonth: value || moment().locale(locale),
      inputValue: (value !== null) ? value.format(inputValueFormat) : null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.value !== nextProps.value && 
        nextProps.value !== null) {
      this.setState({
        inputValue: nextProps.value.format(nextProps.inputValueFormat),
        popupMonth: nextProps.value
      });
    }
  },

  handlePopupMonthChange: function(popupMonth) {
    this.setState({popupMonth});
  },

  handlePopupChange: function(value) {
    this.props.onChange(value);
  },

  handlePopupComplete: function(value) {
    this.setState({isOpen: false});
    this.props.onChange(value);
    this.props.onComplete(value);
  },

  handlePopupCancel: function() {
    this.setState({isOpen: false});
  },

  handleInputChange: function(event) {
    var inputValue = event.target.value;
    var {locale, inputValueFormat} = this.props;

    this.setState({inputValue});

    var parsedInputValue = moment(inputValue, inputValueFormat, locale, true);
    if (parsedInputValue.isValid()) {
      this.setState({popupMonth: parsedInputValue});
      this.props.onChange(parsedInputValue);
    } else {
      this.props.onChange(null);
    }
  },

  handleClick: function() {
    this.setState({isOpen: !this.state.isOpen}, () => {
      this.state.isOpen && this.refs['popup'].focusOnGrid();
    });
  },

  render: function() {
    var CalendarComponent = this.props.calendarComponent;
    var CalendarToggleButtonComponent = this.props.calendarToggleButtonComponent;
    var {buttonComponent, value, ...otherProps} = this.props;

    return (
      <div className="DateInput">
        <InputWithPopup
          {...otherProps}
          isOpen={this.state.isOpen} 
          value={this.state.inputValue}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          onClick={this.handleClick}>
          <CalendarComponent 
            buttonComponent={buttonComponent}
            month={this.state.popupMonth}
            onCancel={this.handlePopupCancel}
            onChange={this.handlePopupChange}
            onComplete={this.handlePopupComplete}
            onMonthChange={this.handlePopupMonthChange}
            ref="popup"
            value={value}
          />
        </InputWithPopup>
        {CalendarToggleButtonComponent && <CalendarToggleButtonComponent
          aria-hidden="true" 
          onClick={this.handleClick}
        />}
      </div>
    );
  }

});

module.exports = DateInput;