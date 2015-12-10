/**
 * app/models/user.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var sequelize = require('sequelize');
var crypto = require('crypto');

// define model
var User = sequelize.define('users', {
        name: sequelize.STRING,
        email: sequelize.STRING,
        password: sequelize.STRING
    },
    {
        instanceMethods: {
            retrieveAll: function(onSuccess, onError){
                User.findAll({}, {raw: true})
                    .success(onSuccess).error(onError);
            },

            retrieveById: function(user_id, onSuccess, onError){
                User.find({where: {id: user_id}}, {raw: true})
                    .success(onSuccess).error(onError);
            },

            add: function(onSuccess, onError){
                var name = this.name;
                var email = this.email;
                var password = this.password;

                //password hashing
                var shasum = crypto.createHash('sha1');
                shasum.update(password);
                password = shasum.digest('hex');

                User.build({name: name, email: email, password: password})
                    .save().success(onSuccess).error(onError);
            },

            updateById: function(user_id, onSuccess, onError) {
                var id = user_id;
                var name = this.name;
                var email = this.email;
                var password = this.password;

                //password hashing
                var shasum = crypto.createHash('sha1');
                shasum.update(password);
                password = shasum.digest('hex');

                User.update({ name: name, email: email, password: password},{where:{id: id}})
                    .success(onSuccess).error(onError);
            },

            removeById: function(user_id, onSuccess, onError){
                User.destroy({where:{id: id}})
                    .success(onSuccess).error(onError);
            }
        }
    }
);

