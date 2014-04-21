/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router-component').Link;
var STATIC_ROOT = require('./StaticRoot');

sortByAge = function(a, b) {
  return a.age - b.age;
}

sortByName = function(a, b) {
  return a.name > b.name
    ? 1
    : a.name < b.name
      ? -1
      : 0;
}

var PhoneList = React.createClass({

  componentWillReceiveProps: function(nextProps) {
    if (this.props.phone !== nextProps.phone) {
      this.getPhonesData(function(err, info) {
        if (err) {
          throw err;
        }
        this.setState(info);
      }.bind(this));
    }
  },

  getInitialState: function() {
    return {
      filterValue: '',
      sortBy: 'name'
    };
  },

  handleFilterChange: function(event) {
    this.setState({
      filterValue: event.target.value
    });
  },

  handleSelect: function(event) {
    this.setState({
      sortBy: event.target.selectedOptions[0].value
    });
  },

  render: function() {
    var sortByFunction = this.state.sortBy === 'age' ? sortByAge : sortByName;
    var filterValue = this.state.filterValue;
    var filteredPhones = this.props.phones.filter(function(phone) {
      return JSON.stringify(phone).indexOf(filterValue) !== -1;
    }).sort(sortByFunction).map(function(phone, i){
      return (
        <li className="thumbnail phone-listing" key={i}>
          <Link href={'/phones/' + phone.id} className="thumb">
            <img src={STATIC_ROOT + phone.imageUrl} />
          </Link>
          <Link href={'/phones/' + phone.id}>{phone.name}</Link>
          <p>{phone.snippet}</p>
        </li>
      );
    });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            {/* Sidebar content */}

            Search: <input value={this.state.filterValue} onChange={this.handleFilterChange} />
            Sort by:
            <select onChange={this.handleSelect}>
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>

          </div>
          <div className="col-md-10">
            {/* Body content */}
            <ul className="phones">
              {filteredPhones}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PhoneList;