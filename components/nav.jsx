var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    render: function(){
      return (
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">TODO LIST</a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="todos" activeClassName="active">TODOS</Link></li>
              <li><Link to="notes" activeClassName="active">NOTES</Link></li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      )

    }
});
