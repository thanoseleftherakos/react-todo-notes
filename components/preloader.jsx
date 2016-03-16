var React = require('react');


module.exports = React.createClass({
  render: function(){
    var active = (this.props.show ? "" : "active");
    return (
    <div className={"preloader-wrapper big " + active}>
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    )
  }

});
