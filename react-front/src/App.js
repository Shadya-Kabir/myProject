import React, { Component } from 'react';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
        <div style={{backgroundColor:'#ecf0f1'}}>
      <div className="App">
      <header className="header-basic-centered" style={{text: '#435a6b', backgroundColor:'#ecf0f1', textAlign: 'center', width:'100%', position:'fixed' }}>
              <nav className="navbar navbar-default navbar-fixed-top">
              <div className="navbar-header">
                <a className="navbar-brand logo" style={{text: '#435a6b'}}>EMU</a>
                  </div>
              <section>
                <nav className="cl-effect-1">
                <ul className="homePageNav nav navbar-nav navbar-right ">  
                  <li><Link to={"Home"}>Home</Link></li>
                  <li><Link to={"About"}>About</Link></li>
                  <li><Link to={"SignIn"}>Sign In</Link></li>
                  <li><Link to={"VendorSignIn"}>Client Sign In</Link></li>
                  
                </ul>  
                </nav>
			</section>
          </nav>
         </header>      
              <div className="container hero">
              </div> 
      </div>
      <div className="componentStyle"> 
                
            </div>
        {React.cloneElement(this.props.children, {})}


        <footer className="footer-basic-centered" style={{backgroundColor:'#435a6b', textAlign: 'center', fontFamily:'Sans-serif'}}>

			<p className="footer-company-motto"style={{color:'white', fontSize:15}}></p>

			<section className="color-1">
				<nav className="cl-effect-20">
					<a href="#"><span data-hover="HOME">HOME</span></a>
					<a href="#"><span data-hover="ABOUT">ABOUT</span></a>
					<a href="#"><span data-hover="CONTACT">CONTACT</span></a>
					<a href="#"><span data-hover="PRICE">PRICE</span></a>
					<a href="#"><span data-hover="FAQ">FAQ</span></a>
				</nav>
			</section>

			<p className="footer-company-name">EMU SEARCH &copy; 2017</p>

		</footer>
      </div>
    );
  }
}

export default App;
