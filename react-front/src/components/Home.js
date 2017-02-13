import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
//import { View, Image } from 'react-native';
import '../index.css';
//<img src={require('images/wave1.jpg')}>lalala</img>
class Home extends Component {
    render() {
        
        return (
        <div>
           <h3 style={{textAlign:'center', fontSize:20}}>FIND YOUR DENTIST TODAY.</h3>
        </div>
        )
    }
}

export default Home;