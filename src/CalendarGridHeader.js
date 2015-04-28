var React = require('react/addons');

var {PureRenderMixin} = React.addons;

var CalendarGridHeader = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    headings: React.PropTypes.array.isRequired
  },

  render: function() {
    var {headings, ...otherProps} = this.props;
    
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
