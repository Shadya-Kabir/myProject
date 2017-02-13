import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import {Link} from 'react-router';
import {Modal,Button, Popover, Tooltip, OverlayTrigger, Grid, Row, Col} from 'react-bootstrap';
import Form, { Input, Fieldset } from 'react-bootstrap-form';
import './SignIn.css';
//var Modal = require('react-modal-bootstrap');
//var Alert = require('react-bootstrap').Alert;
//var DatePicker = require("react-bootstrap-date-picker");
//import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

          //<Grid>
         //<Row className="show-grid">
         
          //<Col md={6} mdPush={0}>
          //   </Col>
          //     <Col md={2} mdPush={0}>Why Register?</Col>
          //   </Row>
          // </Grid>


class SignIn extends Component {
  constructor(){
		super();
		this.state = {
			showModal: false,
      showRegister: false,
      showUpdate:false,

      user_id:null,
      password:null,
      warning:'no-warning',
      warningRegisteredUser:false,

      updateUser:null,
      updateUserId:null,
      updatePassword:null,
      updateRegistered:null,

      fullName:null,
      dateOfBirth:null,
      email:null,
      address:null,
      ph:null,
      registered:null,
      userId:null,
      passWord:null
		}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.closeRegister = this.closeRegister.bind(this);
    this.closeUpdate=this.closeUpdate.bind(this);
    this.openUpdate=this.openUpdate.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.registerFieldChange = this.registerFieldChange.bind(this);
    this.updateFormSubmit=this.updateFormSubmit.bind(this);
    this.updateFieldChange=this.updateFieldChange.bind(this);
    this.sedEmail=this.sendEmail.bind(this);
  }

sendEmail(){
  axios
    .get('http://localhost:2000/email')
    .then((res) => {
        console.log(res);
    })
}



  formSubmit(e){
    e.preventDefault();
    //console.log(e);
    let self = this;
    let logInInfo = {user_id:this.state.user_id, password:this.state.password, warning:this.state.warning};
    console.log("log in from sign in page",this.state.user_id, this.state.password);
    axios
      .post('http://localhost:2000/SignIn',logInInfo)
      .then((res) => {
        console.log(res);
       
      //if the user has successfull logged in a status of 200 will be returned
		  //save the returned token and redirect to the next page.
          if(res.status === 200){
            localStorage.authToken = res.data.token;
            location.href ="http://localhost:3000/private";
          }

      })
      .catch(()=>{
          self.setState({
            warning:'Form submit post error.'
          })
      })
  }

  

txtFieldChange(e){
  console.log("the e.target is: ", e.target.value);
    if(e.target.name === "userid"){this.state.user_id = e.target.value}
    else if(e.target.name === "password"){this.state.password = e.target.value}

     console.log("the name and PW is: ", e.target.value);
    this.setState({
      user_id:this.state.user_id,
      password:this.state.password
    });
  }

registerSubmit(e){
    e.preventDefault();
    let logInInfo = {fullName:this.state.fullName,
                    dateOfBirth:this.state.dateOfBirth,
                    email:this.state.email,
                    address:this.state.address,
                    ph:this.state.ph,
                    registered:this.state.registered,
                    userId:this.state.userId,
                    passWord:this.state.passWord};
                    console.log("signing in page register submit",logInInfo);
axios
      .get('http://localhost:2000/customerFullname/'+this.state.fullName)
      .then( (res) =>{
        if(res.status===203){
          console.log("Customer is null: ");
          this.setState({warningRegisteredUser:false});
           axios
          .post('http://localhost:2000/encrypt',logInInfo)
          .then( (res) =>{
            console.log("registered user detail: ",res);
            })
        }
        else if(res.data.registered===true){
         this.setState({warningRegisteredUser:true});
        }
        else if(res.data.registered===false){
         this.setState({warningRegisteredUser:false, updateUser:res.data});
         console.log('updateUser is: ',this.state.updateUser);
         this.openUpdate();
        }
      })

  }



  registerFieldChange(e){
    if(e.target.name === "fullName"){
        this.state.fullName = e.target.value;
    }
    else if(e.target.name === "dateOfBirth"){
        this.state.dateOfBirth = e.target.value;
    }
    else if(e.target.name === "email"){
        this.state.email = e.target.value;
    }
    else if(e.target.name === "address"){
        this.state.address = e.target.value;
    }
    else if(e.target.name === "ph"){
        this.state.ph = e.target.value;
    }
    
    else if(e.target.name === "userName"){
        this.state.userId = e.target.value;
    }
    else if(e.target.name === "passWord"){
        this.state.passWord = e.target.value;
    }
    this.setState({
      fullName:this.state.fullName,
      dateOfBirth:this.state.dateOfBirth,
      email:this.state.email,
      address:this.state.address,
      ph:this.state.ph,
      registered:'true',
      userId:this.state.userId,
      passWord:this.state.passWord
    });
  }

updateFormSubmit(e){
  e.preventDefault();
    let logInInfo = {fullName:this.state.updateUser.fullName,
                    dateOfBirth:this.state.updateUser.dateOfBirth,
                    email:this.state.updateUser.email,
                    address:this.state.updateUser.address,
                    ph:this.state.updateUser.ph,
                    registered:this.state.updateRegistered,
                    userId:this.state.updateUserId,
                    passWord:this.state.updatePassword};
                    console.log("sign in page update form submit",logInInfo);

           axios
          .post('http://localhost:2000/encryptUpdate',logInInfo)
          .then( (res) =>{
            console.log("registered user detail: ",res);
            })
}
  updateFieldChange(e){
    
    if(e.target.name === "updateUserid"){
        this.state.updateUserId = e.target.value;
    }
    else if(e.target.name === "updatePassword"){
        this.state.updatePassword = e.target.value;
    }
    this.setState({
      updateUserId:this.state.updateUserId,
      updatePassWord:this.state.updatePassword,
      updateRegistered:'true'
    });
  }



  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  closeRegister() {
    this.setState({ showRegister: false, warningRegisteredUser: false });
  }

  openRegister() {
    this.close();
    this.setState({ showRegister: true });
  }

  closeUpdate() {
    this.setState({ showUpdate: false });
  }

  openUpdate() {
    this.closeRegister()
    this.setState({ showUpdate: true });
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

    return (
      <div className="logo">
        <section >
        <p style={{textAlign:'center'}}>
					<Button onClick={this.open} className="btn btn-4 btn-4a icon-arrow-right">CUSTOMER SIGN IN</Button>		
				</p>
			</section>
      {/* <modal for sign in /> */}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
    			<h1 className="text-center">Log in</h1>
    			
            <Form>
                <label for="usr">User Name:</label>
                <input onChange={this.txtFieldChange} type="text" className="form-control boxFormat titleInput" name="userid" placeholder="Name" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Password:</label>
                <input onChange={this.txtFieldChange} type="password" className="form-control" name="password" placeholder="Password" id="pwd" />
              </Form>          		
                     <Button style={{marginLeft:0}}onClick={this.formSubmit}>Sign in</Button>
              <div className="checkbox">
                <label><input type="checkbox" />Remember me </label>
              </div>
              <h5>Not registered yet? <a onClick={this.openRegister}>Sign up.</a></h5>			
			    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
       
        {/* <modal for registration /> */}
        <Modal show={this.state.showRegister} onHide={this.closeRegister}>
        
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <Form>
                {this.state.warningRegisteredUser?
                  <div className="alert alert-warning"> 
                <strong>Warning!</strong> This User ID is aready registered.  Please try to Log in.
              </div>:null}
              
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
              <Form>
                <label for="usr">Longin id:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="userName" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Password:</label>
                <input onChange={this.registerFieldChange} type="password" className="form-control" name="passWord" id="pwd" />
              </Form>
                     <Button onClick={this.registerSubmit} style={{marginLeft:0}}>Sign up</Button>
              <div className="checkbox">
                <label><input type="checkbox" />Remember me </label>
              </div>		
			    
          </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.closeUpdate}>Close</Button>
              </Modal.Footer>
          
          </Modal>
          {/* <modal for registration /> */}
          <Modal show={this.state.showUpdate} onHide={this.closeUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <div className="alert alert-warning">
                <strong>Warning!</strong> User with this email is already a customer of one of our clients.  Your info already exist in our database.  Plese set your login ID and password to register with the system.
              </div>
            <hr />
            <div>
    			<h1 className="text-center">Register</h1>
    			
            <Form>
                <label for="usr">User Name:</label>
                <input onChange={this.updateFieldChange} type="text" className="form-control boxFormat titleInput" name="updateUserid" placeholder="Name" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Password:</label>
                <input onChange={this.updateFieldChange} type="password" className="form-control" name="updatePassword" placeholder="Password" id="pwd" />
              </Form>
               			<Button style={{marginLeft:0}} onClick={this.updateFormSubmit}>Register</Button>
              <div className="checkbox">
                <label><input type="checkbox" />Remember me </label>
              </div>
              			
			    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeRegister}>Close</Button>
          </Modal.Footer>
        </Modal>
       
        
      </div>
    );
  }

}
export default SignIn;