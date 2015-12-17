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
var Order = app.get('models').order;
var OrderDetails = app.get('models').orderDetails;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request being made.');

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

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
    });

router.route('/users/email/:email')
    .get(function(req,res){
        var user = User.build();
        user.retrieveByEmail(req.params.email, function(user){
            if(user){
                res.json(user);
            } else {
                res.send(401, "User not found");
            }
        }, function(error){
            res.send("User not found")
        });
    });

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
    });

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
    });

router.route('/reviews/product/:product_ref')
    .get(function(req,res){
        var review = Review.build();
        review.retrieveByRef(req.params.product_ref, function(reviews){
            if(reviews){
                res.json(reviews);
            } else {
                res.send(401, "Review not found");
            }
        }, function(error){
            res.send("Review not found")
        });
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
    });

router.route('apparel/product/:product_ref')
    // get apparel by ref
    .get(function(req,res){
        var apparel = Apparel.build();
        apparel.retrieveByRef(req.params.product_ref, function(apparel){
            if(apparel){
                res.json(apparel);
            } else {
                res.send(401, "Apparel not found");
            }
        }, function(error){
            res.send("Apparel not found")
        });
    });
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
    });

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
    });

router.route('spells/product/:product_ref')
    // get spell by ref
    .get(function(req,res){
        var spell = Spell.build();
        spell.retrieveByRef(req.params.product_ref, function(spell){
            if(spell){
                res.json(spell);
            } else {
                res.send(401, "Spell not found");
            }
        }, function(error){
            res.send("Spell not found")
        });
    });

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
    });

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
    });

router.route('weapons/product/:product_ref')
    // get weapon by ref
    .get(function(req,res){
        var weapon = Weapon.build();
        weapon.retrieveByRef(req.params.product_ref, function(weapon){
            if(weapon){
                res.json(weapon);
            } else {
                res.send(401, "Weapon not found");
            }
        }, function(error){
            res.send("Weapon not found")
        });
    });

// ORDER ROUTES -------------------------------

router.route('/orders')
    // create order
    .post(function(req, res){
        var user_id = req.body.user_id;
        var order_date = req.body.order_date;
        var required_date = req.body.required_date;
        var shipped_date = req.body.shipped_date;
        var ship_via = req.body.ship_via;
        var ship_name = req.body.ship_name;
        var ship_address = req.body.ship_address;
        var ship_city = req.body.ship_city;
        var ship_region = req.body.ship_region;
        var ship_postcode = req.body.ship_postcode;
        var ship_country = req.body.ship_country;

        var order = Order.build({
            user_id: user_id,
            order_date: order_date,
            required_date: required_date,
            shipped_date: shipped_date,
            ship_via: ship_via,
            ship_name: ship_name,
            ship_address: ship_address,
            ship_city: ship_city,
            ship_region: ship_region,
            ship_postcode: ship_postcode,
            ship_country: ship_country

        });
        order.add(function(){
            res.json({message: 'Order created!'});
        },function(err){
            res.send(err);
        });
    })
    // get all Orders
    .get(function(req, res){
        var order = Order.build();
        order.retrieveAll(function(orders){
            if(orders){
                res.json(orders);
            }else{
                res.send(401, "Order not found")
            }
        }, function(error){
            res.send("Order not found");
        })
    });

router.route('/orders/:order_id')
    // update order by id
    .put(function(req,res){
        var order = Order.build();

        order.user_id = req.body.user_id;
        order.order_date = req.body.order_date;
        order.required_date = req.body.required_date;
        order.shipped_date = req.body.shipped_date;
        order.ship_via = req.ship_via;
        order.ship_name = req.body.ship_name;
        order.ship_address = req.body.ship_address;
        order.ship_city = req.body.ship_city;
        order.ship_region = req.body.ship_region;
        order.ship_postcode = req.body.ship_postcode;
        order.ship_country = req.body.ship_country;

        order.updateById(req.params.order_id, function(success){
            console.log(success);
            if(success){
                res.json({message: 'Order updated!'});
            } else{
                res.send(401, "Order not found");
            }
        }, function(error){
            res.send("Order not found");
        });
    })
    // get order by id
    .get(function(req,res){
        var order = Order.build();
        order.retrieveById(req.params.order_id, function(order){
            if(order){
                res.json(order);
            } else {
                res.send(401, "Order not found");
            }
        }, function(error){
            res.send("Order not found")
        });
    })
    // delete order by id
    .delete(function(req, res){
        var order = Order.build();
        order.removeById(req.params.order_id, function(order){
            if(order){
                res.json({message: "Order removed!"});
            } else {
                res.send(401, "Order not found");
            }
        }, function(error){
            res.send("Order not found")
        });
    });

// ORDER DETAIL ROUTES ------------------------
router.route('/order-details')
    // create order details
    .post(function(req, res){

        var order_id = req.body.order_id;
        var product_ref = req.body.product_ref;
        var unit_price = req.body.unit_price;
        var quantity = req.body.quantity;

        var orderDetails = OrderDetails.build({
            order_id: order_id,
            product_ref: product_ref,
            unit_price: unit_price,
            quality: quantity
        });
        orderDetails.add(function(){
            res.json({message: 'Order Details added!'});
        },function(err){
            res.send(err);
        });
    })
    // get all order details
    .get(function(req, res){
        var orderDetails = OrderDetails.build();
        orderDetails.retrieveAll(function(orderDetails){
            if(orderDetails){
                res.json(orderDetails);
            }else{
                res.send(401, "order Details not found")
            }
        }, function(error){
            res.send("order Details not found");
        })
    });

router.route('/order-details/:order_id')
    // update order details by id
    .put(function(req,res){
        var orderDetails = OrderDetails.build();

        orderDetails.order_id = req.body.order_id;
        orderDetails.product_ref = req.body.product_ref;
        orderDetails.unit_price = req.body.unit_price;
        orderDetails.quality = req.body.quality;

        orderDetails.updateById(req.params.order_id, function(success){
            console.log(success);
            if(success){
                res.json({message: 'order Details updated!'});
            } else{
                res.send(401, "order Details not found");
            }
        }, function(error){
            res.send("Order Details not found");
        });
    })
    // get order details by id
    .get(function(req,res){
        var orderDetails = OrderDetails.build();
        orderDetails.retrieveById(req.params.order_id, function(orderDetails){
            if(orderDetails){
                res.json(orderDetails);
            } else {
                res.send(401, "Order Details not found");
            }
        }, function(error){
            res.send("Order Details not found")
        });
    })
    // delete order details by id
    .delete(function(req, res){
        var orderDetails = OrderDetails.build();
        orderDetails.removeById(req.params.order_id, function(orderDetails){
            if(orderDetails){
                res.json({message: "Order Details removed!"});
            } else {
                res.send(401, "Order Details not found");
            }
        }, function(error){
            res.send("Order Details not found")
        });
    });

// all routes are prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Server launched on port ' + port);