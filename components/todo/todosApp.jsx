var React = require('react');
var ReactDom = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var TodoInput = require('./todoinput');
var TodoList = require('./todolist');
var rootUrl = 'https://todos-react-wf8.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ ReactFire],
  getInitialState: function(){
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(fb,'items');
    fb.on('value',this.handleDataLoaded);
    console.log("ok");
  },
  render: function(){
      return <div>
          <div className="section no-pad-bot">
            <div className={"container todos-container " + this.state.loaded}>
              <TodoInput itemsStore = {this.firebaseRefs.items}  />
              <TodoList items={this.state.items} loaded={this.state.loaded} />
            </div>
          </div>
        </div>
  },
  handleDataLoaded: function(){
    this.setState({loaded:true});
  }
});
