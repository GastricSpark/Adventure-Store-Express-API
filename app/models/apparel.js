/**
 * app/models/apparel.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var sequelize = require('sequelize');

//define model
module.exports = function(sequelize, DataTypes){
    return Apparel = sequelize.define('apparel',{
            ref: DataTypes.STRING,
            type: DataTypes.STRING,
            name: DataTypes.STRING,
            desc: DataTypes.STRING,
            armour: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER
        },
        {
            instanceMethod: {
                retrieveAll: function(onSuccess, onError){
                    Apparel.findAll({}, {raw: true})
                        .then(onSuccess).catch(onError);
                },

                retrieveByid: function(apparel_id, onSuccess, onError){
                    var id = apparel_id;
                    Apparel.find({where: {id: id}}, {raw: true})
                        .then(onSuccess).catch(onError);
                },

                add: function(onSuccess, onError){
                    var ref = this.ref;
                    var type = this.type;
                    var name = this.name;
                    var desc = this.desc;
                    var armour = this.armour;
                    var price = this.price;
                    var quantity = this.quantity;

                    Apparel.build({
                        ref: ref,
                        type: type,
                        name: name,
                        desc: desc,
                        armour:armour,
                        price: price,
                        quantity: quantity})
                        .save().then(onSuccess).catch(onError);
                },

                updateById: function(apparel_id, onSuccess, onError) {
                    var id = apparel_id;
                    var ref = this.ref;
                    var type = this.type;
                    var name = this.name;
                    var desc = this.desc;
                    var armour = this.armour;
                    var price = this.price;
                    var quantity = this.quantity;

                    Apparel.update({ref: ref,
                            type: type,
                            name: name,
                            desc: desc,
                            armour:armour,
                            price: price,
                            quantity: quantity},
                        {where:{id: id}})
                        .then(onSuccess).catch(onError);
                },

                removeById: function(apparel_id, onSuccess, onError){
                    var id = apparel_id;
                    Apparel.destroy({where:{id: id}})
                        .then(onSuccess).catch(onError);
                }
            }
        }
    );
};