import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import VendorSignIn from './components/VendorSignIn';
import CustomerPrivatePage from './components/CustomerPrivatePage';
//import SignInVendor from './components/SignInVendor';
import VendorPrivatePage from './components/VendorPrivatePage';
import './index.css';


ReactDOM.render(
  <Router history={hashHistory}>
        <Route path="/" component={App}>
            //<IndexRoute component={Home} />
            <Route path="Home" component={Home}/>   
           <Route path="About" component={About}/> 
            <Route path="SignIn" component={SignIn}/>   
             <Route path="VendorSignIn" component={VendorSignIn}/>   
            <Route path="Vendor" component={VendorPrivatePage}/>
            <Route path="private" component={CustomerPrivatePage}/>
            
            
        </Route>
    </Router>,
  document.getElementById('root')
);
