var React = require('react');
var BoxNotes = require('./box-notes');
var ReactFire = require('reactfire');
var rootUrl = 'https://todos-react-wf8.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ ReactFire],
  getInitialState: function(){
    return {
      notes: {},
      loaded: false
    }
  },
  componentWillMount: function(){
    fb = new Firebase(rootUrl + 'notes/');
    this.bindAsObject(fb,'notes');
    fb.on('value',this.handleDataLoaded);
  },
    render: function(){
      return <div>
          <div className="section no-pad-bot">
            <div className="container notes-container" >
              <button onClick={this.addNote} className="btn-floating green waves-effect waves-light btn-small">ADD NOTE</button>
              <BoxNotes notes={this.state.notes} />
            </div>
          </div>
        </div>

    },
    addNote: function(){
      this.firebaseRefs.notes.push({
        text: "",
        x : 400,
        y : 100,
        width: 200,
        height: 200
      });
    },
    handleDataLoaded: function(){
      this.setState({loaded:true});
    }
});
