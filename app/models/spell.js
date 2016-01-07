/**
 * app/models/spell.js
 * Created by HWhewell on 10/12/2015.
 */

//define model
module.exports = function(sequelize, DataTypes){
    var Spell = sequelize.define('spells',{
            ref: DataTypes.STRING,
            name: DataTypes.STRING,
            desc: DataTypes.STRING,
            effect: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            imageUrl: DataTypes.STRING
        },
        {
            instanceMethods: {
                retrieveAll: function(onSuccess, onError){
                    Spell.findAll({})
                        .then(onSuccess).catch(onError);
                },

                retrieveById: function(spell_id, onSuccess, onError){
                    var id = spell_id;
                    Spell.find({where: {id: id}})
                        .then(onSuccess).catch(onError);
                },

                retrieveByRef: function(spell_ref, onSuccess, onError){
                    var ref = spell_ref;
                    Spell.find({where: {ref: ref}})
                        .then(onSuccess).catch(onError);
                },

                add: function(onSuccess, onError){
                    var ref = this.ref;
                    var name = this.name;
                    var desc = this.desc;
                    var effect = this.effect;
                    var price = this.price;
                    var quantity = this.quantity;
                    var imageUrl = this.imageUrl;

                    Spell.build({
                        ref: ref,
                        name: name,
                        desc: desc,
                        effect:effect,
                        price: price,
                        quantity: quantity,
                        imageUrl: imageUrl})
                        .save().then(onSuccess).catch(onError);
                },

                updateById: function(spell_id, onSuccess, onError) {
                    var id = spell_id;
                    var ref = this.ref;
                    var name = this.name;
                    var desc = this.desc;
                    var effect = this.effect;
                    var price = this.price;
                    var quantity = this.quantity;
                    var imageUrl = this.imageUrl;

                    Spell.update({
                            ref: ref,
                            name: name,
                            desc: desc,
                            effect:effect,
                            price: price,
                            quantity: quantity,
                            imageUrl: imageUrl},
                        {where:{id: id}})
                        .then(onSuccess).catch(onError);
                },

                removeById: function(spell_id, onSuccess, onError){
                    var id = spell_id;
                    Spell.destroy({where:{id: id}})
                        .then(onSuccess).catch(onError);
                }
            }
        }
    );return Spell;
};
