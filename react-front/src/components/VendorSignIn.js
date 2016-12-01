import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import {Link} from 'react-router';
//var Modal = require('react-modal-bootstrap');
import {Modal,Button, Popover, Tooltip, OverlayTrigger, Grid, Row, Col} from 'react-bootstrap';
import Form, { Input, Fieldset } from 'react-bootstrap-form';


class VendorSignIn extends Component {
 
  constructor(){
		super();
		this.state = {
			showModal: false,
      showRegister: false,

      user_id:null,
      password:null,
      warning:'no-warning',

      fullName:null,
      email:null,
      ph:null,
      address:null,
      vendorType:null,
      role:null,
      registered:null,
      userId:null,
      passWord:null
		}
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.closeRegister = this.closeRegister.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.registerFieldChange = this.registerFieldChange.bind(this);
  }

  formSubmit(e){
    e.preventDefault();
    //console.log(e);
    let self = this;
    let logInInfo = {user_id:this.state.user_id, password:this.state.password, warning:this.state.warning};
    console.log("log in from vendorSignIn in page",this.state.user_id, this.state.password);
    axios
      .post('/VendorSignIn',logInInfo)
      .then((res) => {
        console.log("from vendorSignIn formSubmit: ",res);
       
      //if the user has successfull logged in a status of 200 will be returned
		  //save the returned token and redirect to the next page.
          if(res.status === 200){
            localStorage.authToken = res.data.token;
            location.href ="/Vendor";
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
                    email:this.state.email,
                    ph:this.state.ph,
                    address:this.state.address,
                    vendorType:this.state.vendorType,
                    role:this.state.role,
                    registered:this.state.registered,
                    userId:this.state.userId,
                    passWord:this.state.passWord};
                    console.log("VendorSignIn page register submit",logInInfo);
    axios
    
      .post('/vendorEncrypt',logInInfo)
      .then( (res) =>{
        console.log(res);
      })
  }

  registerFieldChange(e){
    if(e.target.name === "fullName"){
        this.state.fullName = e.target.value;
    }
    else if(e.target.name === "email"){
        this.state.email = e.target.value;
    }
    else if(e.target.name === "ph"){
        this.state.ph = e.target.value;
    }
    else if(e.target.name === "address"){
        this.state.address = e.target.value;
    }
    else if(e.target.name === "vendorType"){
        this.state.vendType = e.target.value;
    }
    else if(e.target.name === "role"){
        this.state.role = e.target.value;
    }
    else if(e.target.name === "userName"){
        this.state.userId = e.target.value;
    }
    else if(e.target.name === "passWord"){
        this.state.passWord = e.target.value;
    }
    this.setState({
      fullName:this.state.fullName,
      email:this.state.email,
      ph:this.state.ph,
      address:this.state.address,
      vendorType:this.state.vendorType,
      registered:'false',
      userId:this.state.userId,
      passWord:this.state.passWord
    });
  }



  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  closeRegister() {
    this.setState({ showRegister: false });
  }

  openRegister() {
    this.close();
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

    return (
      <div>
        <h4>Client Sign In Page.</h4>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Sign in
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />
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
              <div className="input-group">
            			<span className="input-group-btn">
               			<button onClick={this.formSubmit} className="btn btn-primary" type="button">Sign in</button>
            			</span>	
                  </div>   
              <div className="checkbox">
                <label><input type="checkbox" />Remember me </label>
              </div>
              <h5>Not registered yet? <a onClick={this.openRegister}>Sign in.</a></h5>			
			    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
       
        
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
                <label for="usr">Email:</label>
                <input onChange={this.registerFieldChange} type="email" className="form-control boxFormat titleInput" name="email" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Ph#</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="ph" id="usr"/>
              </Form>
               <Form>
                <label for="usr">Address:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="address" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Vendory type:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="vendorType" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Role:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="role" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Longin id:</label>
                <input onChange={this.registerFieldChange} type="text" className="form-control boxFormat titleInput" name="userName" id="usr"/>
              </Form>
              <Form>
                <label for="usr">Password:</label>
                <input onChange={this.registerFieldChange} type="password" className="form-control" name="passWord" id="pwd" />
              </Form>
              <div className="input-group">
            			<span className="input-group-btn">
               			<button onClick={this.registerSubmit} className="btn btn-primary" type="button">Sign in</button>
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
        
      </div>
    );
  }

}
export default VendorSignIn;