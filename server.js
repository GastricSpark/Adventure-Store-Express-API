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

// configure app to use bodyParser()
// this will let us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the port
var port = process.env.PORT || 8080;

// set up the models
app.set('models', require('./app/models'));
var User = app.get('models').user;
var Review = app.get('models').review;
var Apparel = app.get('models').apparel;
var Spell = app.get('models').spell;
var Weapon = app.get('models').weapon;

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
    // create user
    .post(function(req, res){
       var name = req.body.name;
       var email = req.body.email;
       var password = req.body.password;

       var user = User.build({name: name, email: email, password: password});
       user.add(function(){
          res.json({message: 'User created!'});
       },function(err){
           res.send(err);
       });
    })
    //get all users
    .get(function(req, res){
       var user = User.build();
       user.retrieveAll(function(users){
           if(users){
               res.json(users);
           }else{
               res.send(401, "User not found")
           }
       }, function(error){
           res.send("User not found");
       })
    });


// REVIEW ROUTES -------------------------------
router.route('/review')
    // create review
    .post(function(req, res){
        var product_ref = req.body.product_ref;
        var stars = req.body.stars;
        var body = req.body.body;
        var author = req.body.author;

        var review = Review.build({product_ref: product_ref, stars: stars, body: body, author: author});
        review.add(function(){
            res.json({message: 'Review created!'});
        },function(err){
            res.send(err);
        });
    })
    //get all reviews
    .get(function(req, res){
        var review = Review.build();
        review.retrieveAll(function(reviews){
            if(reviews){
                res.json(reviews);
            }else{
                res.send(401, "Review not found")
            }
        }, function(error){
            res.send("Review not found");
        })
    });



// APPAREL ROUTES ------------------------------
router.route('/apparel')
    // create apparel
    .post(function(req, res){
        var ref = req.body.ref;
        var type = req.body.type;
        var name = req.body.name;
        var desc = req.body.desc;
        var armour = req.body.armour;
        var price = req.body.price;
        var quantity = req.body.quantity;

        var apparel = Apparel.build({ref: ref, type: type, name: name, desc: desc,
            armour: armour, price: price, quantity: quantity});
        apparel.add(function(){
            res.json({message: 'Apparel created!'});
        },function(err){
            res.send(err);
        });
    })
    // get all apparel
    .get(function(req, res){
        var apparel = Apparel.build();
        apparel.retrieveAll(function(apparel){
            if(apparel){
                res.json(apparel);
            }else{
                res.send(401, "Apparel not found")
            }
        }, function(error){
            res.send("Apparel not found");
        })
    });

// SPELL ROUTES --------------------------------

router.route('/spell')
    //create spell
    .post(function(req, res){
        var ref = req.body.ref;
        var name = req.body.name;
        var desc = req.body.desc;
        var effect = req.body.effect;
        var price = req.body.price;
        var quantity = req.body.quantity;

        var spell = Spell.build({ref: ref, name: name, desc: desc,
            effect: effect, price: price, quantity: quantity});
        spell.add(function(){
            res.json({message: 'Spell created!'});
        },function(err){
            res.send(err);
        });
    })
    //get all spells
    .get(function(req, res){
        var spell = Spell.build();
        spell.retrieveAll(function(spells){
            if(spells){
                res.json(spells);
            }else{
                res.send(401, "Spell not found")
            }
        }, function(error){
            res.send("Spell not found");
        })
    });

// WEAPON ROUTES -------------------------------
router.route('/weapon')
    //create weapon
    .post(function(req, res){
        var ref = req.body.ref;
        var type = req.body.type;
        var name = req.body.name;
        var desc = req.body.desc;
        var damage = req.body.damage;
        var price = req.body.price;
        var quantity = req.body.quantity;

        var weapon = Weapon.build({ref: ref, type: type, name: name, desc: desc,
            damage: damage, price: price, quantity: quantity});
        weapon.add(function(){
            res.json({message: 'Weapon created!'});
        },function(err){
            res.send(err);
        });
    })
    //get all weapons
    .get(function(req, res){
        var weapon = Weapon.build();
        weapon.retrieveAll(function(weapons){
            if(weapons){
                res.json(weapons);
            }else{
                res.send(401, "Weapon not found")
            }
        }, function(error){
            res.send("Weapon not found");
        })
    });


// all of our routes are prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Server launched on port ' + port);