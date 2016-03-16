var React = require('react');
var Preloader = require('../preloader');
var BoxNoteItem = require('./box-note-item');
var _ = require('lodash');


module.exports = React.createClass({

  getInitialState: function(){
    return {
      notes : []
    }
  },
  componentWillReceiveProps: function(newProps){
    this.setState({notes:newProps.notes});
  },
  render: function(){
    var divstyle= {'height':'100%'};
    return (
      <div style={divstyle}>
      {this.renderList()}
      </div>
    );

  },
  renderList: function(){
    var array = $.map(this.state.notes, function(value, index) {
      return [value];
    });
    if(!array[0]) {
      return (
        <h5><i>You currently dont have any notes!</i></h5>
      )
    } else {
      var children = [];
      for(var key in this.state.notes) {
        if(this.state.notes[key] != "notes"){
          var listItem = this.state.notes[key];
          listItem.key = key;
          children.push(
            <BoxNoteItem note={listItem} key={key} />
          )
        }
      }
      return children;
    }
  },


});
