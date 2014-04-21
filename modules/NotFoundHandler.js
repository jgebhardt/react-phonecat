/**
 * @jsx React.DOM
 */

var React = require('react');

var NotFoundHandler = React.createClass({

  render: function() {
    console.log('rendering notfound ')
    return (
      <p>Page not found</p>
    );
  }
});

module.exports = NotFoundHandler;