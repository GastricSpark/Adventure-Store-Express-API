/**
 * app/models/user.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var bcrypt = require('bcrypt-nodejs');

// define model
module.exports = function(sequelize, DataTypes){
      var User = sequelize.define('users', {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING
        },
        {
            instanceMethods: {
                retrieveAll: function(onSuccess, onError){
                    User.findAll({})
                        .then(onSuccess).catch(onError);
                },

                retrieveById: function(user_id, onSuccess, onError){
                    User.find({where: {id: user_id}})
                        .then(onSuccess).catch(onError);
                },

                retrieveByEmail: function(email, onSuccess, onError){
                    User.find({where: {email: email}})
                        .then(onSuccess).catch(onError);
                },

                add: function(onSuccess, onError){
                    var name = this.name;
                    var email = this.email;
                    var password = this.password;
                    var role = this.role;

                    //password hashing
                    bcrypt.hash(password, null, null ,function(err, hash){
                        User.build({name: name, email: email, password: hash, role: role})
                            .save()
                            .then(onSuccess)
                            .catch(onError);
                    });


                },

                updateById: function(user_id, onSuccess, onError) {
                    var id = user_id;
                    var name = this.name;
                    var email = this.email;
                    var password = this.password;
                    var role = this.role;

                    //password hashing
                    bcrypt.hash(password, null, null ,function(err, hash){
                        User.update({ name: name, email: email, password: hash, role: role},{where:{id: id}})
                            .then(onSuccess).catch(onError);
                    });


                },

                removeById: function(user_id, onSuccess, onError){
                    var id = user_id
                    User.destroy({where:{id: id}})
                        .then(onSuccess).catch(onError);
                }
            }
        }
    );return User;
};

