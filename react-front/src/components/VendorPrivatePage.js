//import axios from 'axios';
//import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';
import {Modal,Button, ButtonToolbar, Popover, Tooltip, OverlayTrigger, Grid, Row, Col} from 'react-bootstrap';
import Form, { Input, Fieldset } from 'react-bootstrap-form';

//const EventCalendar = require('react-event-calendar');
//import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
//var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
//var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// class Calendar extends Component{
//   componentDidMount(){
//     const {calendar}=this.refs;

//     {$(calendar).fullCalendar()};
//   }
// }

class VendorPrivatePage extends Component {
 
	constructor(){
		super();
		this.state = {
			customerArray: [],

      data:null,
      loading:true, 
      auth:false,

      id:null,           
      fullName:null,
      email:null,
      ph:null,
      address:null,
      vendorType:null,
      role:null,
      registered:null,
      visitHistory:null,

      customerFullName:null,
      customerDateOfBirth:null,
      customerEmail:null,
      customerAddress:null,
      customerPh:null,
      customerRegistered:null,
      customerUserId:null,
      customerPassWord:null
		}
    //this.getAllCustomer = this.getAllCustomer.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.registerFieldChange = this.registerFieldChange.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.closeRegister = this.closeRegister.bind(this);
    this.addNewCustomer= this.addNewCustomer.bind(this);
    
  }
componentDidMount(){  
      
 const self = this;
    //token check
    if(localStorage.authToken !== undefined || localStorage.authToken !== null){
        //Add token to request header
        
        axios
        .get('http://localhost:2000/VendorPrivate',{headers:{'authorization':localStorage.authToken}})
        .then( (response) => {
            console.log("from customerPrivatePage, res.data is:", response.data);;
            if(response.status === 200){

               axios
                  .get('http://localhost:2000/VendorPrivate2/'+response.data)
                  .then( (res) => {
                      console.log("from customerPrivatePage, res.data is:", res.data);
                          self.setState({
                          id:res.data.id,  
                          fullName:res.data.fullName,
                          email:res.data.email,
                          ph:res.data.ph,
                          address:res.data.address,
                          vendorType:res.data.vendorType,
                          role:res.data.role,
                          registered:'true',
                          loading:false
                          });
                          this.addNewCustomer();
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
//everytime a new customer is added, this function update the customerArray.
  addNewCustomer(){
              axios.get('http://localhost:2000/customers/'+this.state.id)
            
              .then((response)=> {
                console.log(response);
                this.setState({customerArray: response.data});
              })
              .catch(function (error) {
                console.log(error);
              });
  }

  registerSubmit(e){
    e.preventDefault();
    let logInInfo = {fullName:this.state.customerFullName,
                    dateOfBirth:this.state.customerDateOfBirth,
                    email:this.state.customerEmail,
                    address:this.state.customerAddress,
                    ph:this.state.customerPh,
                    registered:this.state.customerRegistered};
                    console.log("signing in page register submit",logInInfo);
    axios
      .post('http://localhost:2000/addUser',logInInfo)
      .then( (res) =>{
        console.log("add user: ",res.data);

        let membership ={customer_id:res.data.id,
                         vendor_id:this.state.id}; 
                         console.log("membership customer id and vendor id: ",membership); 
        axios
          .post('http://localhost:2000/createMember',membership)
          .then((response)=>{
            console.log("member added: ",response);
            this.addNewCustomer();
          })
      })
  }

  registerFieldChange(e){
    if(e.target.name === "fullName"){
        this.state.customerFullName = e.target.value;
    }
    else if(e.target.name === "dateOfBirth"){
        this.state.customerDateOfBirth = e.target.value;
    }
    else if(e.target.name === "email"){
        this.state.customerEmail = e.target.value;
    }
    else if(e.target.name === "address"){
        this.state.customerAddress = e.target.value;
    }
    else if(e.target.name === "ph"){
        this.state.customerPh = e.target.value;
    }
    
    this.setState({
      customerFullName:this.state.customerFullName,
      customerDateOfBirth:this.state.customerDateOfBirth,
      customerEmail:this.state.customerEmail,
      customerAddress:this.state.customerAddress,
      customerPh:this.state.customerPh,
      customerRegistered:'false',
      customerUserId:null,
      customerPassWord:null
      
    });
  }
closeRegister() {
    this.setState({ showRegister: false });
  }

  openRegister() {
    //this.close();
    this.setState({ showRegister: true });
  }

  render() {
    
    const popover = (
      <Popover id="modal-popover" title="Date of birth format:">
        MM/DD/YYYY
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
          <h1>Hello {this.state.data}</h1>
          <h4> {this.state.fullName}</h4>
          <h4>{this.state.email}</h4>
          <h4>{this.state.ph}</h4>
          <h4>{this.state.address}</h4>
          <h4>{this.state.vendorType}</h4>
          <h4>{this.state.role}</h4>
          <h4>{this.state.registered}</h4>

          <ButtonToolbar>
         
        <Button onClick={this.openRegister} bsStyle="primary">Add New User</Button>
        <Button bsStyle="warning">Search User</Button>
        </ButtonToolbar>

         <Modal bsSize="large" show={this.state.showRegister} onHide={this.closeRegister}>
        <Grid>
         <Row className="show-grid">
         
          <Col md={6} mdPush={0}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <div>	
            <Form>
                <label for="usr">Full Name:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="fullName" id="usr"/>
              </Form>
              <Form>
                <label for="usr"><OverlayTrigger overlay={popover}><a href="#">Date of Birth:</a></OverlayTrigger></label>
                
                <input onChange={this.registerFieldChange} type="date" className="form-control boxFormat titleInput" name="dateOfBirth" id="usr"/>
              </Form>
               <Form>
                <label for="usr">Email:</label>
                <input onChange={this.registerFieldChange} type="email" className="form-control boxFormat titleInput" name="email" id="usr"/>
              </Form>
               <Form>
                <label for="usr">Address:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="address" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Ph#</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="ph" id="usr"/>
              </Form>
              
              <div className="input-group">
            			<span className="input-group-btn">
               			<button onClick={this.registerSubmit} className="btn btn-primary" type="button">Add New Customer</button>
            			</span>	
                  </div>   
              <div className="checkbox">
                <label><input type="checkbox" />Remember me </label>
              </div>
              <h5>Not registered yet? <a onClick={this.closeRegister}>Sign in.</a></h5>			
			    </div>
          </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeRegister}>Close</Button>
              </Modal.Footer>
            </Col>
              <Col md={2} mdPush={0}>Why Register?</Col>
            </Row>
          </Grid>
          </Modal>

if(this.state.customerArray.length>0){
          <div className="container">
          <h3>My Customer table</h3>     
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DateOfBirth</th>
                <th>Email</th>
                <th>Address</th>
                <th>VisitHistory</th>
                <th>Registered</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>  
            </thead>
            <tbody>
            {this.state.customerArray.map((content,key)=>{
			          return (
              <tr>
                <td>{content.id}</td>
                <td>{content.fullName}</td>
                <td>{content.dateOfBirth}</td>
                <td>{content.email}</td>
                <td>{content.address}</td>
                <td>{content.VisitHistory}</td>
                <td>{content.registered===true?'Yes':'No'}</td>
                <td><Button bsStyle="info" bsSize="small">Update</Button></td>
                <td><Button bsStyle="danger" bsSize="small">Delete</Button></td>
              </tr>
                )
            })
          }
            </tbody>
          </table>
        </div>
      }
        </div>

        );
    }
         
  }
}
export default VendorPrivatePage;