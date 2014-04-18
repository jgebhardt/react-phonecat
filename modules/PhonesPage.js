/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router-component').Link;

var PhonesPage = React.createClass({

  render: function() {
    return (
      <div className="PhonesPage">
        <h1>Hello, anonymous!</h1>
        <p><Link href="/users/doe">Login</Link></p>
      </div>
    );
  }
});

module.exports = PhonesPage;