var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var moment = require('moment');

function getDayHeadings(month) {
  var endDay = moment(month).endOf('week');
  var currentDay = moment(month).startOf('week');
  var headings = [];

  while (!currentDay.isAfter(endDay)) {
    headings.push({
      abbr: currentDay.format('dd'),
      title: currentDay.format('dddd')
    });

    currentDay.add(1, 'days');
  }

  return headings;
}

var CalendarGridHeader = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    month: React.PropTypes.object.isRequired
  },

  render: function() {
    var {month, ...otherProps} = this.props;
    var headings = getDayHeadings(month);
    
    return (
      <thead {...otherProps}>
        <tr>
          {headings.map((heading, idx) => (
            <th key={idx}>
              <abbr tile={heading.title}>{heading.abbr}</abbr>
            </th>
          ))}
        </tr>
      </thead>
    );
  }

});

module.exports = CalendarGridHeader;
