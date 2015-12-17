/**
 * app/models/order.js
 * Created by HWhewell on 17/12/2015.
 */

//define model
module.exports = function(sequelize, DataTypes){
    var Order = sequelize.define('orders',{

            user_id: DataTypes.INTEGER,
            order_date: DataTypes.DATEONLY,
            required_date: DataTypes.DATEONLY,
            shipped_date: DataTypes.DATEONLY,
            ship_via: DataTypes.STRING,
            ship_name: DataTypes.STRING,
            ship_address: DataTypes.STRING,
            ship_city: DataTypes.STRING,
            ship_region: DataTypes.STRING,
            ship_postcode: DataTypes.STRING,
            ship_country: DataTypes.STRING

        },
        {   freezeTableName: true,
            instanceMethods: {
                retrieveAll: function(onSuccess, onError){
                    Order.findAll({})
                        .then(onSuccess).catch(onError);
                },

                retrieveById: function(order_id, onSuccess, onError){
                    var id = order_id;
                    Order.find({where: {id: id}})
                        .then(onSuccess).catch(onError);
                },

                add: function(onSuccess, onError){
                    var user_id = this.user_id;
                    var order_date = this.order_date;
                    var required_date = this.required_date;
                    var shipped_date = this.shipped_date;
                    var ship_via  = this.ship_via;
                    var ship_name = this.ship_name;
                    var ship_address = this.ship_address;
                    var ship_city = this.ship_city;
                    var ship_region = this.ship_region;
                    var ship_postcode = this.ship_postcode;
                    var ship_country = this.ship_country;

                    Order.build({
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

                        })
                        .save().then(onSuccess).catch(onError);
                },

                updateById: function(order_id, onSuccess, onError) {
                    var id = order_id;
                    var user_id = this.user_id;
                    var order_date = this.order_date;
                    var required_date = this.required_date;
                    var shipped_date = this.shipped_date;
                    var ship_via  = this.ship_via;
                    var ship_name = this.ship_name;
                    var ship_address = this.ship_address;
                    var ship_city = this.ship_city;
                    var ship_region = this.ship_region;
                    var ship_postcode = this.ship_postcode;
                    var ship_country = this.ship_country;

                    Order.update({
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
                        },
                        {where:{id: id}})
                        .then(onSuccess).catch(onError);
                },

                removeById: function(order_id, onSuccess, onError){
                    var id = order_id;
                    Order.destroy({where:{id: id}})
                        .then(onSuccess).catch(onError);
                }
            }
        }
    ); return Order;
};