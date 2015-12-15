/**
 * Server.js
 * Created by HWhewell on 10/12/2015.
 */

// BASE SETUP
// =============================================================================

// call the packages needed
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this allows getting data from a POST
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
    next(); // make sure to go to the next routes and don't stop here
});

router.get('/', function(req, res){
   res.json({ message: 'Welcome to the Adventure-Store API' });
});

// USER ROUTES -------------------------------
router.route('/users')
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
    // get all users
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

router.route('/users/:user_id')
    // update a user by id
    .put(function(req,res){
       var user = User.build();

       user.name = req.body.name;
       user.email = req.body.email;
       user.password = req.body.password;

       user.updateById(req.params.user_id, function(success){
           console.log(success);
           if(success){
               res.json({message: 'User updated!'});
           } else{
               res.send(401, "User not found");
           }
       }, function(error){
           res.send("User not found");
       });
    })
    // get a user by id
    .get(function(req,res){
        var user = User.build();
        user.retrieveById(req.params.user_id, function(users){
            if(users){
                res.json(users);
            } else {
                res.send(401, "User not found");
            }
        }, function(error){
            res.send("User not found")
        });
    })
    // delete user by id
    .delete(function(req, res){
        var user = User.build();
        user.removeById(req.params.user_id, function(users){
            if(users){
                res.json({message: "User removed!"});
            } else {
                res.send(401, "User not found");
            }
        }, function(error){
            res.send("User not found")
        });
    }
);

// REVIEW ROUTES -------------------------------
router.route('/reviews')
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
    // get all reviews
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
    }
);

router.route('/reviews/:review_id')
    // update a review by id
    .put(function(req,res){
        var review = Review.build();

        review.product_ref = req.body.product_ref;
        review.stars = req.body.stars;
        review.body = req.body.body;
        review.author = req.body.author;;

        review.updateById(req.params.review_id, function(success){
            console.log(success);
            if(success){
                res.json({message: 'Review updated!'});
            } else{
                res.send(401, "Review not found");
            }
        }, function(error){
            res.send("Review not found");
        });
    })
    // get a review by id
    .get(function(req,res){
        var review = Review.build();
        review.retrieveById(req.params.review_id, function(reviews){
            if(reviews){
                res.json(reviews);
            } else {
                res.send(401, "Review not found");
            }
        }, function(error){
            res.send("Review not found")
        });
    })
    // delete review by id
    .delete(function(req, res){
        var review = Review.build();
        review.removeById(req.params.review_id, function(reviews){
            if(reviews){
                res.json({message: "Review removed!"});
            } else {
                res.send(401, "Review not found");
            }
        }, function(error){
            res.send("User not found")
        });
    }
);


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
    }
);
router.route('/apparel/:apparel_id')
    // update apparel by id
    .put(function(req,res){
        var apparel = Apparel.build();

        apparel.ref = req.body.ref;
        apparel.type = req.body.type;
        apparel.name = req.body.name;
        apparel.desc = req.body.desc;
        apparel.armour = req.body.armour;
        apparel.price = req.body.price;
        apparel.quantity = req.body.quantity;

        apparel.updateById(req.params.apparel_id, function(success){
            console.log(success);
            if(success){
                res.json({message: 'Apparel updated!'});
            } else{
                res.send(401, "Apparel not found");
            }
        }, function(error){
            res.send("Apparel not found");
        });
    })
    // get apparel by id
    .get(function(req,res){
        var apparel = Apparel.build();
        apparel.retrieveById(req.params.apparel_id, function(apparel){
            if(apparel){
                res.json(apparel);
            } else {
                res.send(401, "Apparel not found");
            }
        }, function(error){
            res.send("Apparel not found")
        });
    })
    // delete apparel by id
    .delete(function(req, res){
        var apparel = Apparel.build();
        apparel.removeById(req.params.apparel_id, function(apparel){
            if(apparel){
                res.json({message: "Apparel removed!"});
            } else {
                res.send(401, "Apparel not found");
            }
        }, function(error){
            res.send("Apparel not found")
        });
    }
);

// SPELL ROUTES --------------------------------

router.route('/spells')
    // create spell
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
    // get all spells
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
    }
);
router.route('/spells/:spell_id')
    // update spell by id
    .put(function(req,res){
        var spell = Spell.build();

        spell.ref = req.body.ref;
        spell.name = req.body.name;
        spell.desc = req.body.desc;
        spell.effect = req.body.effect;
        spell.price = req.body.price;
        spell.quantity = req.body.quantity;

        spell.updateById(req.params.spell_id, function(success){
            console.log(success);
            if(success){
                res.json({message: 'Spell updated!'});
            } else{
                res.send(401, "Spell not found");
            }
        }, function(error){
            res.send("Spell not found");
        });
    })
    // get spell by id
    .get(function(req,res){
        var spell = Spell.build();
        spell.retrieveById(req.params.spell_id, function(spell){
            if(spell){
                res.json(spell);
            } else {
                res.send(401, "Spell not found");
            }
        }, function(error){
            res.send("Spell not found")
        });
    })
    // delete spell by id
    .delete(function(req, res){
        var spell = Spell.build();
        spell.removeById(req.params.spell_id, function(spell){
            if(spell){
                res.json({message: "Spell removed!"});
            } else {
                res.send(401, "Spell not found");
            }
        }, function(error){
            res.send("Spell not found")
        });
    }
);
// WEAPON ROUTES -------------------------------
router.route('/weapons')
    // create weapon
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
    // get all weapons
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
    }
);
router.route('/weapons/:weapon_id')
    // update weapon by id
    .put(function(req,res){
        var weapon = Weapon.build();

        weapon.ref = req.body.ref;
        weapon.type = req.body.type;
        weapon.name = req.body.name;
        weapon.desc = req.body.desc;
        weapon.damage = req.body.damage;
        weapon.price = req.body.price;
        weapon.quantity = req.body.quantity;

        weapon.updateById(req.params.weapon_id, function(success){
            console.log(success);
            if(success){
                res.json({message: 'Weapon updated!'});
            } else{
                res.send(401, "Weapon not found");
            }
        }, function(error){
            res.send("Weapon not found");
        });
    })
    // get weapon by id
    .get(function(req,res){
        var weapon = Weapon.build();
        weapon.retrieveById(req.params.weapon_id, function(weapon){
            if(weapon){
                res.json(weapon);
            } else {
                res.send(401, "Weapon not found");
            }
        }, function(error){
            res.send("Weapon not found")
        });
    })
    // delete weapon by id
    .delete(function(req, res){
        var weapon = Weapon.build();
        weapon.removeById(req.params.weapon_id, function(weapon){
            if(weapon){
                res.json({message: "Weapon removed!"});
            } else {
                res.send(401, "Weapon not found");
            }
        }, function(error){
            res.send("Weapon not found")
        });
    }
);

// all routes are prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Server launched on port ' + port);