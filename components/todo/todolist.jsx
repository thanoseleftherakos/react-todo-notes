var React = require('react');
var Preloader = require('../preloader');
var TodoListItem = require('./todolist-item');
var EditTodoListItem = require('./edittodolist-item');
var _ = require('lodash');

module.exports = React.createClass({
    getInitialState: function(){
      return {
        onEdit: false,
        items : []
      }
    },
    componentWillReceiveProps: function(newProps){
      this.setState({items:newProps.items});
    },
    render: function(){
      var loadedClass = (this.props.loaded ? "loaded" : "");
      return (
        <div className="row">
          <div className="col s6 offset-s3">
            <Preloader show={this.props.loaded} />
            <ul className={"todos_list collection " + loadedClass}>
              {this.renderList()}
            </ul>
          </div>
        </div>
      )
    },
    renderList: function(){
      var array = $.map(this.state.items, function(value, index) {
        return [value];
      });
      if(!array[0]) {
        return (
          <h5><i>Woohoo! You dont have any remaining todos!</i></h5>
        )
      } else {
        var children = [];
        for(var key in this.state.items) {
          if(this.state.items[key].text){
            var listItem = this.state.items[key];
            listItem.key = key;
            children.push(
              <TodoListItem item={listItem} key={key} onEdit={this.handleItemEdit} />
            )
          }
        }
        return children;
      }
    },
    handleItemEdit: function(itemProps){

      console.log(this.props.items[1]);
      console.log('You clicked: ' + this.props.items[1]);
    }
});
