var React = require('react');
var $ = require('jquery');
require('jquery-ui');
var ReactDom = require('react-dom');
var rootUrl = 'https://todos-react-wf8.firebaseio.com/';

module.exports = React.createClass({
    getInitialState: function() {
      return {
        text: '',
        top: '',
        left: '',
        width: '',
        height: ''
       }
    },
    componentWillMount: function(){
        this.setState({text: this.props.note.text});
        this.fb = new Firebase(rootUrl+'notes/'+this.props.note.key);
    },
    componentWillReceiveProps: function(nextProps){
      this.setState({text: nextProps.note.text});
      var $note = $(ReactDom.findDOMNode(this));
      $note.css({'top': nextProps.note.y,'left' : nextProps.note.x,'width': nextProps.note.width, 'height':nextProps.note.height});
    },
    resizeTextArea : function () {
       var thisnode = $(ReactDom.findDOMNode(this));
       thisnode.find('.note-text').height(thisnode.height() - 45);
    },
    dragStop : function(){
      var thisnode = $(ReactDom.findDOMNode(this));
      var parent = thisnode.parent();
      var xaxis = thisnode.position().left;
      var yaxis = thisnode.position().top;
      this.fb.update({x:xaxis,y:yaxis});
    },
    resizeStop: function(){
      var $note = $(ReactDom.findDOMNode(this));
      this.fb.update({width:$note.width(),height:$note.height()});
    },
    componentDidMount: function() {
      var $note = $(ReactDom.findDOMNode(this));
      $note.find('.note-text').height($note.height() - 45);
      $note.resizable({
        handles: "se",
        stop: this.resizeStop
      });
      $note.draggable({
        handle: ".box-header",
        stop: this.dragStop
      });
      this.setState({text: this.props.note.text});
      $note.resize(this.resizeTextArea);
      $note.css({'top': this.props.note.y,'left' : this.props.note.x,'width': this.props.note.width, 'height':this.props.note.height});
    },

    handleChange: function(event) {
      this.setState({text: event.target.value});
      this.fb.update({text: event.target.value});
    },
    render: function(){
      return (
        <div className="box note">
          <div className="box-header">
            <i class="fa fa-times-circle"></i>
            <a href="#" className="right remove hidden" onClick={this.handleDelete}>&times;</a>
          </div>
          <textarea className="note-text" value={this.state.text} onChange={this.handleChange}></textarea>
        </div>
      )

    },
    handleDelete: function(event){
      event.preventDefault();
      const thisBox = this;
      $(ReactDom.findDOMNode(this)).fadeOut( "fast", function() {
        thisBox.fb.remove();
      });
    }
});
