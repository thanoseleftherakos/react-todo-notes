var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var Main = require('./main');
var TodosApp = require('./todo/todosApp');
var NotesApp = require('./notes/notesApp');



module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="todos" component={TodosApp} />
      <Route path="notes" component={NotesApp} />
    </Route>
  </Router>
);
