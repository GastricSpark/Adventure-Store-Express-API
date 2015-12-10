/**
 * app/models/spell.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var sequelize = require('sequelize');

//define model
var Spell = sequelize.define('spells',{
        ref: sequelize.STRING,
        name: sequelize.STRING,
        desc: sequelize.STRING,
        effect: sequelize.STRING,
        price: sequelize.INTEGER,
        quantity: sequelize.INTEGER
    },
    {
        instanceMethod: {
            retrieveAll: function(onSuccess, onError){
                Spell.findAll({}, {raw: true})
                    .success(onSuccess).error(onError);
            },

            retrieveByid: function(spell_id, onSuccess, onError){
                var id = spell_id;
                Spell.find({where: {id: id}}, {raw: true})
                    .success(onSuccess).error(onError);
            },

            add: function(onSuccess, onError){
                var ref = this.ref;
                var name = this.name;
                var desc = this.desc;
                var effect = this.effect;
                var price = this.price;
                var quantity = this.quantity;

                Spell.build({
                    ref: ref,
                    name: name,
                    desc: desc,
                    effect:effect,
                    price: price,
                    quantity: quantity})
                    .save().success(onSuccess).error(onError);
            },

            updateById: function(spell_id, onSuccess, onError) {
                var id = spell_id;
                var ref = this.ref;
                var name = this.name;
                var desc = this.desc;
                var effect = this.effect;
                var price = this.price;
                var quantity = this.quantity;

                Spell.update({
                        ref: ref,
                        name: name,
                        desc: desc,
                        effect:effect,
                        price: price,
                        quantity: quantity},
                    {where:{id: id}})
                    .success(onSuccess).error(onError);
            },

            removeById: function(spell_id, onSuccess, onError){
                var id = spell_id;
                Spell.destroy({where:{id: id}})
                    .success(onSuccess).error(onError);
            }
        }
    }
);