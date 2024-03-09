import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UnrealEngine from './UnrealEngine';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/unreal">Unreal Engine</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/unreal" component={UnrealEngine} />
      </div>
    </Router>
  );
};

const Home = () => {
  return <h1>Welcome to the home page!</h1>;
};

const UnrealEngine = () => {
  return <UnrealEngine />;
};

ReactDOM.render(<App />, document.getElementById('root'));
