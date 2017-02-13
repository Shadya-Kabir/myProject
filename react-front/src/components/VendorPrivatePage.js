//import axios from 'axios';
//import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';
import {Modal,Button, ButtonToolbar, Popover, Tooltip, OverlayTrigger, Grid, Row, Col} from 'react-bootstrap';
import Form, { Input, Fieldset } from 'react-bootstrap-form';
import './VendorPrivatePage.css';

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

      searchId:null,
      searchFullName:null,
      searchDateOfBirth:null,
      searchEmail:null,
      searchAddress:null,
      searchPh:null,
      searchRegistered:null,
      searchUserId:null, 

      searchFound:false,

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
    this.searchSubmit = this.searchSubmit.bind(this);
    this.searchFieldChange = this.searchFieldChange.bind(this);
    this.openSearch = this.openSearch.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.addSubmit = this.addSubmit.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    
  }
componentDidMount(){  
      
 const self = this;
    //token check
    if(localStorage.authToken !== undefined || localStorage.authToken !== null){
        //Add token to request header
        
        axios
        .get('/VendorPrivate',{headers:{'authorization':localStorage.authToken}})
        .then( (response) => {
            console.log("from customerPrivatePage, res.data is:", response.data);;
            if(response.status === 200){

               axios
                  .get('/VendorPrivate2/'+response.data)
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
             location.href = '/Home';
         })
         
      }
      else{
         location.href = '/Home';
     }
  }

  sendEmail(){
  axios
    .get('/email')
    .then((res) => {
        console.log(res);
    })
}
//everytime a new customer is added, this function update the customerArray.
  addNewCustomer(){
              axios.get('/customers/'+this.state.id)
            
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
      .post('/addUser',logInInfo)
      .then( (res) =>{
        console.log("add user: ",res.data);

        let membership ={customer_id:res.data.id,
                         vendor_id:this.state.id}; 
                         console.log("membership customer id and vendor id: ",membership); 
        axios
          .post('/createMember',membership)
          .then((response)=>{
            console.log("member added: ",response);
            this.addNewCustomer();
          })
      })
  }

searchSubmit(e){
    e.preventDefault();
    let fullName = this.state.searchFullName;
                    
                    console.log("signing in page search submit",fullName);
    axios
      .get('/customerFullname/'+fullName)
      .then( (res) =>{
        console.log("add user: ",res.data);

        if(res.status===203){
          console.log("customer doesn't exist");
          this.setState({searchFound:'false'});
        }else{
          console.log("customer exists!!!");
          this.setState({
            searchFound:'true',
            searchId:res.data.id,
            searchFullName:res.data.fullName,
            searchDateOfBirth:res.data.dateOfBirth,
            searchEmail:res.data.email,
            searchAddress:res.data.address,
            searchPh:res.data.ph,
            searchRegistered:res.data.registered,
            searchUserId:res.data.user_id, 
          })
        } 
      })
  }

  addSubmit(e){
        let membership ={customer_id:this.state.searchId,
                         vendor_id:this.state.id}; 
                         console.log("membership customer id and vendor id: ",membership); 
        axios
          .post('/createMember',membership)
          .then((response)=>{
            console.log("member added: ",response);
            this.addNewCustomer();
          })
  }

 searchFieldChange(e){
    if(e.target.name === "searchName"){
        this.state.searchFullName = e.target.value;
        console.log(e.target.value);
    }
   
    this.setState({
      searchFullName:this.state.searchFullName,
    });
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

  closeSearch() {
    this.setState({ searchFound: false });
  }

  openSearch() {
    //this.close();
    this.setState({ searchFound: true });
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
        <div className='container'>
        <div className='row'>
         <div style={{postition:'relative'}} className="ownerinfo col-xs-12 col-sm-6 col-md-6 col-lg-6">
         
         <span className="descriptionbadge container">
         <img src='https://s-media-cache-ak0.pinimg.com/originals/65/a2/1c/65a21cae38d275c9b63f1c37fef1f443.jpg' style={{height:'300 px', width:'80%', padding:'20px', border:'solid'}} />
         </span>
         </div>
         <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" style={{left:'-22px', padding:'20px'}}>

          <h2 style={{textAlign:"left"}}>{this.state.fullName}</h2>
          <h4 style={{textAlign:"left"}}> {this.state.data}</h4>
          <h4 style={{textAlign:"left"}}>Email: {this.state.email}</h4>
          <h4 style={{textAlign:"left"}}>Ph: {this.state.ph}</h4>
          <h4 style={{textAlign:"left"}}>Address: {this.state.address}</h4>
          <h4 style={{textAlign:"left"}}>Client Type: {this.state.vendorType}</h4>
          <h4 style={{textAlign:"left"}}>Role: {this.state.role}</h4>
          <h4 style={{textAlign:"left"}}>Registered: {this.state.registered}</h4>
          </div>
          </div>
          <div style={{postition:'relative',textAlign:'left'}}>
         
        <Button onClick={this.openRegister} bsStyle="primary">Add User</Button>
          <Form>
            <input onChange={this.searchFieldChange} style={{width:'50%', marginTop:'10',marginBottom:'10', left:'-50'}}type="text" placeholder='Full name' className="form-control boxFormat titleInput" name="searchName" id="usr"/>
          </Form>
        <Button onClick={this.searchSubmit} bsStyle="warning">Search User</Button>
       
          </div>
          
{this.state.customerArray.length>0?
          <div className="container">
          <h3 style={{textAlign:'center'}}>MY CUSTOMER TABLE</h3>     
          <table className="table table-hover, overflow-x:auto">
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
                <td>{content.registered===true?
                  <img src='https://thumb1.shutterstock.com/display_pic_with_logo/915209/166851164/stock-vector-check-mark-button-166851164.jpg' height='40' width='40'/>
                  :<Button onClick={this.sendEmail} bsStyle="primary" bsSize="small">Invite</Button>}</td>
                <td><Button bsStyle="primary" bsStyle="info" bsSize="small">Update</Button></td>
                <td><Button bsStyle="danger" bsSize="small">Delete</Button></td>
              </tr>
                )
            })
          }
            </tbody>
          </table>
        </div>
        :null}

         <Modal show={this.state.showRegister} onHide={this.closeRegister}>
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



        <Modal bsSize="large" show={this.state.searchFound} onHide={this.closeSearch}>
        
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <Form>               
                <label for="usr">Full Name:</label>
                <input type="text" className="form-control boxFormat titleInput" value={this.state.searchFullName} id="usr"/>
              </Form>
              <Form>
              <label for="date">Date of Birth:</label>
                <input type="text" className="form-control boxFormat titleInput" value={this.state.searchDateOfBirth} id="usr"/>
              </Form>
               <Form>
                <label for="usr">Email:</label>
                <input type="email" className="form-control boxFormat titleInput" value={this.state.searchEmail} id="usr"/>
              </Form>
               <Form>
                <label for="usr">Address:</label>
                <input type="text" className="form-control boxFormat titleInput" value={this.state.searchAddress} id="usr"/>
              </Form>
              <Form>
                <label for="usr">Ph#</label>
                <input type="text" className="form-control boxFormat titleInput" value={this.state.searchPh} id="usr"/>
              </Form>
              <Form>
                <label for="usr">Longin id:</label>
                <input type="text" className="form-control boxFormat titleInput" value={this.state.searchUserId} id="usr"/>
              </Form>
              
              <div className="input-group">
            			<span className="input-group-btn">
               			<button onClick={this.addSubmit} className="btn btn-primary" type="button">Add user</button>
            			</span>	
                  </div>   
              <div className="checkbox">
                <label><input type="checkbox" />Remember me </label>
              </div>
              <h5>Not registered yet? <a onClick={this.closeSearch}>Register</a></h5>			
			    
          </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeUpdate}>Close</Button>
              </Modal.Footer>
          
          </Modal>
        </div>

        );
    }
         
  }
}
export default VendorPrivatePage;