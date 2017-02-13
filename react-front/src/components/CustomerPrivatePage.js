import axios from 'axios';
import React, {Component} from 'react';
//import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import '../index.css';

class CustomerPrivatePage extends Component{
  constructor(){
    super();
    this.state = {data:null,
                  loading:true, 
                  auth:false,
                  
                  fullName:null,
                  dateOfBirth:null,
                  email:null,
                  address:null,
                  ph:null,
                  registered:null,
                  visitHistory:null
              }
  }
  componentDidMount(){
    /* 
      TASK 3: When accessing this page/component, make sure that there is an authToken in your local storage.
        If there is no authToken, redirect to the login page.
        If there is an authToken, send a request to the '/privatedata' endpoint with the authToken included in the headers.
      TASK 7: The response should include the username, display "Hello, [USERNAME]" on this page.
    */
    const self = this;
    //token check
    if(localStorage.authToken !== undefined || localStorage.authToken !== null){
        //Add token to request header
        
        axios
        .get('/private',{headers:{'authorization':localStorage.authToken}})
        .then( (response) => {
            console.log("from customerPrivatePage, res.data is:", response.data);;
            if(response.status === 200){

               axios
                  .get('/private2/'+response.data)
                  .then( (res) => {
                      console.log("from customerPrivatePage, res.data is:", res.data);
                          self.setState({
                          fullName:res.data.fullName,
                          dateOfBirth:res.data.dateOfBirth,
                          email:res.data.email,
                          address:res.data.address,
                          ph:res.data.ph,
                          registered:'true',
                          visitHistory:res.data.visitHistory,
                          loading:false
                          });
                  })

                self.setState({
                auth:true,
                data:response.data
                });
            };
        })
         .catch((err)=>{
             //send user back to login page if token is invalid
             location.href = '/Home';
         })
      }
      else{
         location.href = '/Home';
     }
  }
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div className='container'>
<div className="ownerinfo col-xs-12 col-sm-6 col-md-6 col-lg-6">
         
         <span className="descriptionbadge container">
         <img src='http://openlegalservices.org/wp-content/uploads/2014/08/blankheadshot.gif' height='400' width='400' />
         </span>
         </div>
         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" style={{left:'-22px'}}>
          <h2 style={{textAlign:"left"}}>Hello {this.state.data}</h2>
          <h4 style={{textAlign:"left"}}>{this.state.fullName}</h4>
          <h4 style={{textAlign:"left"}}>Date of Birth: {this.state.dateOfBirth}</h4>
          <h4 style={{textAlign:"left"}}>Email: {this.state.email}</h4>
          <h4 style={{textAlign:"left"}}>Ph: {this.state.ph}</h4>
          <h4 style={{textAlign:"left"}}>Address: {this.state.address}</h4>
          <h4 style={{textAlign:"left"}}>Role: {this.state.visitHistory}</h4>
          <h4 style={{textAlign:"left"}}>Registered: {this.state.registered}</h4>
          </div>
        </div>
       
        );
    }
  }
}

export default CustomerPrivatePage;