/**
 * Server.js
 * Created by HWhewell on 10/12/2015.
 */

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// configure app to use bodyParser()
// this will let us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the port
var port = process.env.PORT || 8080;

// DATABASE SETUP
// =============================================================================

var sequelize = new Sequelize(
    'adventure_store',
    'Harry',
    'Password123',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: console.log,
        define: {
                timestamps: true
        }
    });

//load models
var models = [
  'user',
  'review',
  'spell',
  'weapon',
  'apparel'
];

models.forEach(function(model){
   module.exports[model] = sequelize.import(__dirname + '/app/models/' + model);
});

var User = require('./app/models/user').User;
var Review = require('./app/models/review').Review;
var Spell = require('./app/models/spell').Spell;
var Weapon = require('./app/models/weapon').Weapon;
var Apparel = require('./app/models/apparel').Apparel;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request being made.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res){
   res.json({ message: 'Welcome to the Adventure-Store API' });
});

// USER ROUTES -------------------------------
router.route('/user')
    .post(function(req, res){
       var name = req.body.name;
       var email = req.body.email;
       var password = req.body.password;

       var user = User.build({name:name, email: email, password:password});
       user.addUser(function(success){
          res.json({message: 'User created!'});
       },function(err){
           res.send(err);
       });
    });

// all of our routes are prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Server launched on port ' + port);