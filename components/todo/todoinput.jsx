var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        showAddBtn: false,
        text: ''
       }
    },
    inputChanged: function(e){
      this.setState({text : e.target.value});
      if( e.target.value) {
        this.setState({showAddBtn: true});
      }
      else {
        this.setState({showAddBtn: false});
      }
    },
    handleClick: function(){
      //Send value of text input to firebase
      this.props.itemsStore.push({
        text: this.state.text,
        done :false
      });
      this.setState({text: ''});
    },
    render: function(){
      var key = this.state.showAddBtn;
      return (
        <div className="row">
          <div className="input-field col s6 offset-s3 todo_input">
            <input id="todo" type="text" className="validate" value={this.state.text} onChange={this.inputChanged} />
            <label htmlFor="todo">I want to...</label>
            <ReactCSSTransitionGroup transitionName="switch">
              { this.state.showAddBtn ? <a className="btn-floating btn-large waves-effect waves-light green todo_add_button" key={key} onClick={this.handleClick}><i className="material-icons">add</i></a> : null }
            </ReactCSSTransitionGroup>
          </div>
        </div>
      )

    }
});
