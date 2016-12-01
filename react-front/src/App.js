import React, { Component } from 'react';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-default">
            <div className="collapse navbar-collapse">
              <ul className="homePageNav nav navbar-nav navbar-right">     
                <li><Link to={"Home"}>Home</Link></li>
                <li><Link to={"About"}>About</Link></li>
                <li><Link to={"SignIn"}>Sign In</Link></li>
                <li><Link to={"VendorSignIn"}>Vendor Sign In</Link></li>
                <li><Link to={"Vendor"}>Vendor Page</Link></li>  
              </ul>
              </div>
              </nav>
        {React.cloneElement(this.props.children, {})}
      </div>
    );
  }
}

export default App;
