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
        .get('http://localhost:2000/private',{headers:{'authorization':localStorage.authToken}})
        .then( (response) => {
            console.log("from customerPrivatePage, res.data is:", response.data);;
            if(response.status === 200){

               axios
                  .get('http://localhost:2000/private2/'+response.data)
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
             location.href = 'http://localhost:3000/Home';
         })
      }
      else{
         location.href = 'http://localhost:3000/Home';
     }
  }
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
          <h1>Hello {this.state.data}</h1>
          <h4> {this.state.fullName}</h4>
          <h4>{this.state.dateOfBirth}</h4>
          <h4>{this.state.email}</h4>
          <h4>{this.state.address}</h4>
          <h4>{this.state.ph}</h4>
          <h4>{this.state.registered}</h4>
          <h4>{this.state.visitHistory}</h4>
        </div>
        );
    }
  }
}

export default CustomerPrivatePage;