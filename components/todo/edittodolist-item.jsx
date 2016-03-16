var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var rootUrl = 'https://todos-react-wf8.firebaseio.com/';


module.exports = React.createClass({
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl+'items/'+this.props.item.key);
  },
  getInitialState: function() {
    return {
      showSaveBtn: false,
      text: this.props.item.text
     }
  },
  render: function(){

    return (
        <input id="todo" type="text" className="validate" value={this.state.text} onChange={this.handleOnChange} />
    )
  },
  handleOnChange: function(e){
    this.props.item.text = e.target.value; 
    this.setState({text : e.target.value});
    this.fb.update({text : e.target.value});
    if( e.target.value) {
      this.setState({showSaveBtn: true});
    }
    else {
      this.setState({showSaveBtn: false});
    }
  }

});
