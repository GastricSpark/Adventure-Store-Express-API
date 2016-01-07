/**
 * app/models/apparel.js
 * Created by HWhewell on 10/12/2015.
 */

//define model
module.exports = function(sequelize, DataTypes){
     var Apparel = sequelize.define('apparel',{
            ref: DataTypes.STRING,
            type: DataTypes.STRING,
            name: DataTypes.STRING,
            desc: DataTypes.STRING,
            armour: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            imageUrl: DataTypes.STRING
        },
        {   freezeTableName: true,
            instanceMethods: {
                retrieveAll: function(onSuccess, onError){
                    Apparel.findAll({})
                        .then(onSuccess).catch(onError);
                },

                retrieveById: function(apparel_id, onSuccess, onError){
                    var id = apparel_id;
                    Apparel.find({where: {id: id}})
                        .then(onSuccess).catch(onError);
                },

                retrieveByRef: function(apparel_ref, onSuccess, onError){
                    var ref = apparel_ref;
                    Apparel.find({where: {ref: ref}})
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
                    var imageUrl = this.imageUrl;

                    Apparel.build({
                        ref: ref,
                        type: type,
                        name: name,
                        desc: desc,
                        armour:armour,
                        price: price,
                        quantity: quantity,
                        imageUrl: imageUrl})
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
                    var imageUrl = this.imageUrl;

                    Apparel.update({ref: ref,
                            type: type,
                            name: name,
                            desc: desc,
                            armour:armour,
                            price: price,
                            quantity: quantity,
                            imageUrl: imageUrl},
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
    ); return Apparel;
};