/**
 * app/models/weapon.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var sequelize = require('sequelize');

//define model
module.exports = function(sequelize, DataType) {
    return Weapon = sequelize.define('weapons', {
            ref: DataType.STRING,
            type: DataType.STRING,
            name: DataType.STRING,
            desc: DataType.STRING,
            damage: DataType.STRING,
            price: DataType.INTEGER,
            quantity: DataType.INTEGER
        },
        {
            instanceMethod: {
                retrieveAll: function (onSuccess, onError) {
                    Weapon.findAll({}, {raw: true})
                        .success(onSuccess).error(onError);
                },

                retrieveByid: function (weapon_id, onSuccess, onError) {
                    var id = weapon_id;
                    Weapon.find({where: {id: id}}, {raw: true})
                        .success(onSuccess).error(onError);
                },

                add: function (onSuccess, onError) {
                    var ref = this.ref;
                    var type = this.type;
                    var name = this.name;
                    var desc = this.desc;
                    var damage = this.damage;
                    var price = this.price;
                    var quantity = this.quantity;

                    Weapon.build({
                        ref: ref,
                        type: type,
                        name: name,
                        desc: desc,
                        damage: damage,
                        price: price,
                        quantity: quantity
                    })
                        .save().success(onSuccess).error(onError);
                },

                updateById: function (weapon_id, onSuccess, onError) {
                    var id = weapon_id;
                    var ref = this.ref;
                    var type = this.type;
                    var name = this.name;
                    var desc = this.desc;
                    var damage = this.damage;
                    var price = this.price;
                    var quantity = this.quantity;

                    Weapon.update({
                            ref: ref,
                            type: type,
                            name: name,
                            desc: desc,
                            damage: damage,
                            price: price,
                            quantity: quantity
                        },
                        {where: {id: id}})
                        .success(onSuccess).error(onError);
                },

                removeById: function (weapon_id, onSuccess, onError) {
                    var id = weapon_id;
                    Weapon.destroy({where: {id: id}})
                        .success(onSuccess).error(onError);
                }
            }
        }
    );
};