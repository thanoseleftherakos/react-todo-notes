var React = require('react');
var Nav = require('./nav');
var Todos = require('./todo/todosApp');

module.exports = React.createClass({
  render: function(){
    return <div>
      <Nav />
      {this.props.children ? this.props.children : <Todos /> }
    </div>
  }
});
