var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var moment = require('moment');
var joinClasses = require('react/lib/joinClasses');

function getWeeks(month, value) {
  var today = moment();
  var endDay = moment(month).endOf('month').endOf('week');
  var currentDay = moment(month).startOf('month').startOf('week');
  var currentWeek;
  var weeks = [];

  while (!currentDay.isAfter(endDay)) {
    if (currentDay.day() === 0) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push({
      isOtherMonth: currentDay.month() !== month.month(),
      isValue: value && currentDay.isSame(value, 'day'),
      isToday: currentDay.isSame(today, 'day'),
      value: moment(currentDay),
      formatted: currentDay.format('D')
    });

    currentDay.add(1, 'days');
  }

  return weeks;
}

var DatePopupGridBody = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    getDescendantIdForDay: React.PropTypes.func.isRequired,
    month: React.PropTypes.object.isRequired,
    onComplete: React.PropTypes.func.isRequired,
    value: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      value: null
    };
  },

  handleDayClick: function(day) {
    this.props.onComplete(day);
  },

  render: function() {
    var weeks = getWeeks(this.props.month, this.props.value);

    return (
      <tbody>
        {weeks.map((week, idx) => (
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
                id={this.props.getDescendantIdForDay(day.value)}
                key={idx}
                onClick={this.handleDayClick.bind(this, day.value)}
                role="gridcell">
                {day.formatted}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

});

module.exports = DatePopupGridBody;