import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import '../index.css';

class Home extends Component {
    render() {
        
        return (
        <div>
        <img src=".images/wave1.jpeg" className="logoTop"/>
           <h3>lalalaThis is Home Page.</h3>
            </div>
        )
    }
}

export default Home;