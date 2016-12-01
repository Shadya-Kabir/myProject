const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');

const nodemailer = require('nodemailer');
//const router = express.Router();

//const sendgrid = require('sendgrid')(ShadyaKabir,Fullm00n)

//middleware
const authorize     = require('./middleware/authorize');

//application
const app = express();
app.use(bodyParser.json());

//defines which origins and headers are permitted
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

app.use(express.static('build'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//require and configure knex first
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'brainStation123',
    database : 'finalprojectdb',
    charset  : 'utf8'
  }
});
// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);

//send email
app.get('/email',(req,res) =>{
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shadya36@gmail.com', // Your email id
            pass: '' // Your password
        }
    });

    var mailOptions = {
    from: '<shadya36@gmail.com>', // sender address
    to: 'shadya36@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: 'Hello World plain text',
    html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
            console.log('Message sent: ' + info.response);
                res.json({yo: info.response});  
            }
        });
    
    })
app.get('/customerRegisterPage/:fullName', (req, res) => {
    /* EDIT CODE HERE ----------------------------------
    render pages/movie with data of specfic movie
    -------------------------------------------------- */
     Customer.where({fullName:req.params.fullName})
        .fetch()
	    .then(customer => {
            if(customer){
                console.log(customer.attributes)
                res.render('pages/customerRegisterPage',{customer: customer.attributes})
            }
            
    })
    
})


const Customer = bookshelf.Model.extend({
    tableName: 'customers',
    vendors: function() {
        return this.belongsToMany(Vendor).through(Membership);
    }
})

const Vendor = bookshelf.Model.extend({
    tableName: 'vendors',
    customers: function() {
        return this.belongsToMany(Customer).through(Membership);
    }
})

let Membership = bookshelf.Model.extend({
    tableName:'membership',
    customer: function() {
    return this.belongsTo(Customer);
  },
    vendor: function() {
    return this.belongsTo(Vendor);
  }
});
//Getting all the customer with the vendor with id: vendor_id
app.get('/customers/:vendor_id',(req,res) =>{
    // get all cars with fetchAll()
    Membership.where({vendor_id:req.params.vendor_id})
        .fetchAll()
	    .then(customers => {
		let users = [];
        customers.models.map(customer => {
            // res.json(customers.models.map(user => user.attributes))
            // console.log(customer.attributes.customer_id)
            Customer.where({id:customer.attributes.customer_id})
                .fetch()
                .then(user=>{
                    users.push(user);
                    if (users.length == customers.length){
                        console.log(users)
                        res.json(users)
                    }
                }) 
        });
    })
})
//getting the customer with :id
app.get('/customer/:id',(req,res) =>{
    // get all cars with fetchAll()
    Customer.where({user_id:req.params.id})
        .fetch()
	    .then(customer => {
            if(customer){
                res.json(customer.attributes)
            }
            else{
                res
                .status(203)
                .send({data:null});
            }
         
    })
})

//getting the customer with it's fullName'
app.get('/customerFullname/:id',(req,res) =>{
    // get all cars with fetchAll()
    Customer.where({fullName:req.params.id})
        .fetch()
	    .then(customer => {
            if(customer){
                res.json(customer.attributes)
            }
            else{
                res
                .status(203)
                .send({data:null});
            }
         
    })
})

// app.get('/customers/:ID',(req,res) =>{
//     // get all cars with fetchAll()
//     Car
// 	.where({id:req.params.ID})
// 	.fetch()
// 	.then(customer => {
//         if(res.json(customer.attributes)!=undefined){
//             res.json(customer.attributes)
//         }	
//     }) 
// })

// app.get('/api/cars/:ID',(req,res) =>{
//     // get all cars with fetchAll()
//     console.log("incluede dealership is: :",req.query.includeDealership);
//     Car
// 	.where({id:req.params.ID})
// 	.fetch({withRelated: 'dealership'})
// 	.then(car => {
//         if(req.query.includeDealership){
//             res.json({car:car.attributes,
//                     dealer:car.related('dealership').attributes});
//         }	
//         else{
//             res.json(car.attributes);
//         }	
//     }) 
// })
//POST endpoint for password encryption and creating user profiles
app.post('/encrypt',(req,res) => {
   console.log('server post',req.body);
    let fullName=req.body.fullName;
    let dateOfBirth=req.body.dateOfBirth;
    let email=req.body.email;
    let address=req.body.address;
    let ph=req.body.ph;
    let registered=req.body.registered;
    let userId=req.body.userId;
    let passWord=req.body.passWord;
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passWord, salt, (err, hash) => {
                // Store hash in your password DB. 
                if(err) console.log(err);
                
                const newCustomer = new Customer({
                        fullName:fullName,
                        dateOfBirth:dateOfBirth,
                        email:email,
                        address:address,
                        ph:ph,
                        registered:registered,
                        user_id:userId,
                        password:hash
                    })
                        newCustomer.save()
                        .then(customer => {
                        console.log(customer)
                   })

                // fs.writeFile('notpasswords/'+username+'.txt',hash, (err) => {
                //     if(err) throw err;
                //     res.json('Password Saved');
                // });
            });
        });
});

//POST endpoint for password encryption and creating user profiles
app.post('/encryptUpdate',(req,res) => {
   console.log('server post',req.body);
    
    let fullName=req.body.fullName;
    let passWord=req.body.passWord;
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passWord, salt, (err, hash) => {
                // Store hash in your password DB. 
                if(err) console.log(err);
        let attributesToUpdate={registered:req.body.registered,
                                user_id:req.body.userId,
                                password:hash}
                Customer.where({fullName:fullName})
                    .save(attributesToUpdate, {patch: true})
                    .then(user => {
                        console.log(user.attributes)
                        res.json(user.attributes)
                })       
            });
        });
});

app.post('/addUser',(req,res) => {
   console.log('server post',req.body);
    let fullName=req.body.fullName;
    let dateOfBirth=req.body.dateOfBirth;
    let email=req.body.email;
    let address=req.body.address;
    let ph=req.body.ph;
    let registered=req.body.registered;
    // let userId=req.body.userId;
    // let passWord=req.body.passWord;
    //generate salt and create a hash the password
    
                const newCustomer = new Customer({
                        fullName:fullName,
                        dateOfBirth:dateOfBirth,
                        email:email,
                        address:address,
                        ph:ph,
                        registered:registered
                    })
                        newCustomer.save()
                        .then(customer => {
                        res.send(customer)
                   })

});

app.post('/createMember',(req,res) => {
   console.log('server createMember post',req.body);
    let customer_id=req.body.customer_id;
    let vendor_id=req.body.vendor_id;
    
                const newMember = new Membership({
                        customer_id:customer_id,
                        vendor_id:vendor_id
                    })
                        newMember.save()
                        .then(member => {
                        console.log("the new member is: ",member);
                        res.send(member);
                   })
});

//POST endpoint for logging in to the server
app.post('/SignIn', (req,res) => {
    let user_id = req.body.user_id;
    let password = req.body.password;
    let fullName = req.body.fullName;
    console.log("im in server:",user_id,password);
    /*
        TASK 1: Check if the user provides the right password for their username.
        If the password is correct, then create a token with the username, using a secret key of your choice, and send the token back
    */
    Customer
	.where({user_id:user_id})
	.fetch()
	.then(user => {
		 bcrypt.compare(password, user.attributes.password.toString(), function(err, result) {
            if(result){
				//sign a token in successful login and send to client side
                let token = jwt.sign({username:user_id},'brainstationkey');
                res.json({token:token});
            }
            else{
                res
                .status(203)
                .send({token:null});
            }
        });
	})
})

//POST endpoint for logging in to the server
app.post('/VendorSignIn', (req,res) => {
    let user_id = req.body.user_id;
    let password = req.body.password;
    let fullName = req.body.fullName;
    console.log("im in server VendorSignIn:",user_id,password);
    /*
        TASK 1: Check if the user provides the right password for their username.
        If the password is correct, then create a token with the username, using a secret key of your choice, and send the token back
    */
    Vendor
	.where({user_id:user_id})
	.fetch()
	.then(user => {
		 bcrypt.compare(password, user.attributes.password.toString(), function(err, result) {
            if(result){
				//sign a token in successful login and send to client side
                let token = jwt.sign({username:user_id},'brainstationkey');
                console.log("server.js vendorSignIn token: ", token);
                res.json({token:token});
            }
            else{
                res
                .status(203)
                .send({token:null});
            }
        });
	})
})

// Any requests to the 'user' or 'order' endpoints will pass
// through authentication before reaching the endpoint.

app.get('/private',authorize, (req,res) => {
    console.log('req.decoded: ', req.decoded.username);
    res.json(req.decoded.username);
});

app.get('/private2/:userId', (req,res) => {
    // get all cars with fetchAll()
    console.log(req.params.userId);
    Customer.where({user_id:req.params.userId})
        .fetch()
	    .then(customer => {
            console.log(customer.attributes);
		res.json(customer.attributes)
        
    })
    //res.json(req.decoded.username);
});

app.post('/vendorEncrypt',(req,res) => {
   console.log('server post',req.body);
    let fullName=req.body.fullName;
    let email=req.body.email;
    let ph=req.body.ph;
    let address=req.body.address;
    let vendorType=req.body.vendorType;
    let role=req.body.role;
    let registered=req.body.registered;
    let userId=req.body.userId;
    let passWord=req.body.passWord;

    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(passWord, salt, (err, hash) => {
                // Store hash in your password DB. 
                if(err) console.log("from server.js scrypt: ",err);
                
                const newVendor = new Vendor({
                        fullName:fullName,
                        email:email,
                        ph:ph,
                        address:address,
                        vendorType:vendorType,
                        role:role,
                        registered:registered,
                        user_id:userId,
                        password:hash
                    })
                        newVendor.save()
                        .then(vendor => {
                        console.log(vendor)
                   })

                // fs.writeFile('notpasswords/'+username+'.txt',hash, (err) => {
                //     if(err) throw err;
                //     res.json('Password Saved');
                // });
            });
        });
});


app.get('/VendorPrivate',authorize, (req,res) => {
    console.log('req.decoded: ', req.decoded.username);
    res.json(req.decoded.username);
});

app.get('/VendorPrivate2/:userId', (req,res) => {
    // get all cars with fetchAll()
    console.log(req.params.userId);
    Vendor.where({user_id:req.params.userId})
        .fetch()
	    .then(vendor => {
            console.log(vendor.attributes);
		res.json(vendor.attributes)
        
    })
    //res.json(req.decoded.username);
});
// use the port value from the node environment, or 8080 if it can't be found'
const PORT = process.env.PORT || 8080;
// Change this from 8080 to 80
app.listen(PORT, function(){
	console.log("Listening on Port:%s",PORT)
	console.log("Stop with Ctrl+C");
});
app.get('*', (req, res)=>{
   res.sendFile((__dirname+'/build/index.html'));
});



