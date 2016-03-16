var React = require('react');
var rootUrl = 'https://todos-react-wf8.firebaseio.com/';

module.exports = React.createClass({
    getInitialState: function(){
      return {
        text: this.props.item.text,
        done: this.props.item.done
      }
    },
    componentWillMount: function(){
      this.fb = new Firebase(rootUrl+'items/'+this.props.item.key);
    },
    componentWillReceiveProps: function(){
      var d = Date.now();

      console.log("received props.."+d);
    },
    render: function(){
      var itemClass = this.state.done ? "completed" : "not-completed";
      return (
        <li className={"collection-item " + itemClass} >
          <p onClick={this.props.item.done ? this.handleUndo : this.props.onEdit.bind(null,this.props)}>{this.props.item.text}</p>
          {this.props.item.done ?
            <a className="btn-floating red waves-effect waves-light todo_check_btn btn-small" onClick={this.handleDelete}><i className="material-icons">delete</i></a> :
            <a className="btn-floating green waves-effect waves-light todo_check_btn btn-small" onClick={this.handleDone}><i className="material-icons">done</i></a>
          }
        </li>
      )
    },
    handleDone: function(){
      var update = {done: true};
      this.setState(update);
      this.fb.update(update);
    },
    handleUndo: function( ) {
      if(this.props.item.done){
        var update = {done: false};
        this.setState(update);
        this.fb.update(update);
      }
      else {
        console.log("editing");
          this.props.editListItemState(this.props.item);
      }
    },
    handleDelete: function(){
      this.fb.remove();
    }

});
