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

// database connection
var sequelize = new Sequelize(
    'adventure_store',
    'Harry',
    'Password123',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: console.log,
        define: {
                timestamps: false
        }
    });


// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

router.get('/', function(req, res){
   res.json({ message: 'Welcome to the Adventure-Store API' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes are prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server launched on port ' + port);