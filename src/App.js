import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Country from './pages/Country';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/country/:id" component={Country} /> 
        <Route render={() => (<div className="text-danger">404</div>)} />
      </Switch>
    </Router>
  );
}

export default App;
