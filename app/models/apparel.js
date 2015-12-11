/**
 * app/models/apparel.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var sequelize = require('sequelize');

//define model
module.exports = function(sequelize, DataType){
    return Apparel = sequelize.define('apparel',{
            ref: DataType.STRING,
            type: DataType.STRING,
            name: DataType.STRING,
            desc: DataType.STRING,
            armour: DataType.STRING,
            price: DataType.INTEGER,
            quantity: DataType.INTEGER
        },
        {
            instanceMethod: {
                retrieveAll: function(onSuccess, onError){
                    Apparel.findAll({}, {raw: true})
                        .success(onSuccess).error(onError);
                },

                retrieveByid: function(apparel_id, onSuccess, onError){
                    var id = apparel_id;
                    Apparel.find({where: {id: id}}, {raw: true})
                        .success(onSuccess).error(onError);
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
                        .save().success(onSuccess).error(onError);
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
                        .success(onSuccess).error(onError);
                },

                removeById: function(apparel_id, onSuccess, onError){
                    var id = apparel_id;
                    Apparel.destroy({where:{id: id}})
                        .success(onSuccess).error(onError);
                }
            }
        }
    );
};