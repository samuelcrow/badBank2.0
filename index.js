var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create account
app.get('/account/create/:name/:email/:password', function(req, res) {
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user)=>{
            console.log(user);
            res.send(user);
        });
});

//balance
app.get('/account/all/:email', function(req, res){
    dal.all().
        then((docs) => {
            docs.forEach((element)=>{
                if (element.email === req.params.email){
                    console.log(req.params.email);
                    res.send(req.params.email);
                }
            });
    });
})

//login
app.get('/account/all/:email/:password', function(req, res){
    dal.all().
        then((docs) => {
            docs.forEach((element)=>{
                if (element.email === req.params.email && element.password === req.params.password){
                    console.log(req.params.email);
                    res.send(req.params.email);
                }
            });
    });
})

// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});



var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
/*
//login
app.get('/account/login/:email/:password', function(req, res) {
    res.send({
        email: req.params.email,
        password: req.params.password
    })
})

//all data
app.get('/account/all', function(req, res) {
    res.send({
        name: 'Samuel',
        email: 'samuel@mit.edu',
        password: 'secret'
    })
})

//balance
app.get('/account/:email', function(req, res){
    res.send({
        email: req.params.email
    })
})

//withdraw/deposit
app.get('/account/update/:email/:amount', function(req, res){
    res.send({
        email: req.params.email,
        amount: req.params.amount
    })
})*/