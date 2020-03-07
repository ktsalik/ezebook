import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import CreatePage from './components/CreatePage/CreatePage';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      darkMode: false,
    };

    this.onDarkModeChange = this.onDarkModeChange.bind(this);
  }

  onDarkModeChange(state) {
    this.setState({
      darkMode: state,
    });
  }

  render() {
    return (
      <div className={`App ${this.state.darkMode === 'on' ? 'dark' : 'light'}`}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard
                darkMode={this.state.darkMode}
                onDarkModeChange={this.onDarkModeChange}
              />
            </Route>
            <Route path="/create-page">
              <CreatePage
                darkMode={this.state.darkMode}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
