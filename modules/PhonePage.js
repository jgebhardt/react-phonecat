/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var superagent  = require('superagent');

var Link = require('react-router-component').Link;

var PhonePage = React.createClass({
  mixins: [ReactAsync.Mixin],

  getPhoneInfo: function(phoneName, cb) {
    superagent.get(
      'http://localhost:3000/api/phones/' + phoneName,
      function(err, res) {
        cb(err, res ? res.body : null);
      });
  },

  getInitialStateAsync: function(cb) {
    this.getPhoneInfo(this.props.phone, cb);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.phone !== nextProps.phone) {
      this.getPhoneInfo(nextProps.phone, function(err, info) {
        if (err) {
          throw err;
        }
        this.setState(info);
      }.bind(this));
    }
  },

  render: function() {
    var otherUser = this.props.phone === 'lg-axis' ? 'dell-streak-7' : 'lg-axis';
    return (
      <div className="PhonePage">
        <h1>Hello, {this.state.name}!</h1>
        <p>
          Go to <Link href={"/phones/" + otherUser}>/users/{otherUser}</Link>
        </p>
        <p><Link href="/">Logout</Link></p>
      </div>
    );
  }
});

module.exports = PhonePage