var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var joinClasses = require('react/lib/joinClasses');
var getUniqueId = require('react-pick/lib/helpers/getUniqueId');

const DAYS_PER_WEEK = 7;

var DatePopup = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    /**
     * `moment` date representing the month that we're in. Can fall anywhere in
     * the month that the date popup is letting the user select in.
     */
    month: React.PropTypes.object.isRequired,

    /**
     * Event handler fired when the user does an action that changes `value`.
     */
    onChange: React.PropTypes.func.isRequired,

    /**
     * Event handler fired when the user does an action that finalizes the 
     * `value` change.
     */
    onComplete: React.PropTypes.func.isRequired,

    /**
     * Event handler fired when the user does an action that changes the month
     * that the date popup is currently representing.
     */
    onMonthChange: React.PropTypes.func.isRequired,

    /**
     * `moment` date representing the currently selected date.
     */
    value: React.PropTypes.object,
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

  getDescendantIdForDay: function(day) {
    return day && `${this.state.id}-day-${day.format('DDD')}`;
  },

  getDayHeaders: function() {
    var day = moment(this.props.month).startOf('week');
    var end = moment(this.props.month).endOf('week');
    var headers = [];

    while (!day.isAfter(end)) {
      headers.push({
        abbr: day.format('dd'),
        title: day.format('dddd')
      });

      day.add(1, 'days');
    }

    return headers;
  },

  getDays: function() {
    var day = moment(this.props.month).startOf('month').startOf('week');
    var end = moment(this.props.month).endOf('month').endOf('week');
    var today = moment();
    var week = [];
    var weeks = [week];
    var dayIndex = 0;

    while (!day.isAfter(end)) {
      if (dayIndex >= DAYS_PER_WEEK) {
        week = [];
        weeks.push(week);
        dayIndex = 0;
      }

      week.push({
        isOtherMonth: day.month() !== this.props.month.month(),
        isValue: this.props.value && day.isSame(this.props.value, 'day'),
        isToday: day.isSame(today, 'day'),
        value: moment(day),
        formatted: day.format('D')
      });

      day.add(1, 'days');
      dayIndex++;
    }

    return weeks;
  },

  handleChangeMonthToNext: function() {
    var nextMonth = moment(this.props.month).add(1, 'months');
    this.props.onMonthChange(nextMonth)
  },

  handleChangeMonthToPrevious: function() {
    var previousMonth = moment(this.props.month).subtract(1, 'months');
    this.props.onMonthChange(previousMonth)
  },

  handleDayClick: function(day) {
    this.props.onComplete(day);
  },

  render: function() {
    return (
      <div className="DatePopup">
        <div className="DatePopup-header">
          <button 
            className="DatePopup-previousButton"
            onClick={this.handleChangeMonthToPrevious}
            tabIndex="0">
            &#9664;
          </button>

          <button 
            className="DatePopup-nextButton"
            onClick={this.handleChangeMonthToNext}
            tabIndex="0">
            &#9654;
          </button>
          
          <div 
            aria-live="assertive"
            aria-atomic="true"
            className="DatePopup-heading"
            id={this.getHeadingId()}
            role="heading">
            {this.props.month.format('MMMM YYYY')}
          </div>
        </div>

        <table 
          aria-activedescendant={this.getDescendantIdForDay(this.props.value)}
          aria-labelledby={this.getHeadingId()}
          role="grid"
          tabIndex="0">
          <thead>
            <tr>
              {this.getDayHeaders().map((header, idx) => {
                return (
                  <th key={idx}>
                    <abbr tile={header.title}>{header.abbr}</abbr>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.getDays().map((week, idx) => (
              <tr key={idx}>
                {week.map((day, idx) => (
                  <td 
                    aria-selected={day.isSelected+''}
                    className={joinClasses(
                      'DatePopup-day',
                      day.isToday && 'DatePopup-day--isToday',
                      day.isOtherMonth && 'DatePopup-day--isOtherMonth',
                      day.isValue && 'DatePopup-day--isValue'
                    )}
                    id={this.getDescendantIdForDay(day.value)}
                    key={idx}
                    onClick={this.handleDayClick.bind(this, day.value)}
                    role="gridcell">
                    {day.formatted}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = DatePopup;