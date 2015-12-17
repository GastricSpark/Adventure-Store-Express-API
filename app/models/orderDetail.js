/**
 * app/models/orderDetails.js
 * Created by HWhewell on 17/12/2015.
 */
module.exports = function(sequelize, DataTypes){
    var OrderDetails = sequelize.define('order_details',{

            order_id: DataTypes.INTEGER,
            product_ref: DataTypes.STRING,
            unit_price: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER

        },
        {   freezeTableName: true,
            instanceMethods: {
                retrieveAll: function(onSuccess, onError){
                    OrderDetails.findAll({})
                        .then(onSuccess).catch(onError);
                },

                retrieveById: function(order_details_id, onSuccess, onError){
                    var id = order_details_id;
                    OrderDetails.find({where: {id: id}})
                        .then(onSuccess).catch(onError);
                },

                add: function(onSuccess, onError){
                    var order_id = this.order_id;
                    var product_ref = this.product_ref;
                    var unit_price = this.unit_price;
                    var quantity = this.quantity;

                    OrderDetails.build({
                        order_id: order_id,
                        product_ref: product_ref,
                        unit_price: unit_price,
                        quantity: quantity

                    })
                        .save().then(onSuccess).catch(onError);
                },

                updateById: function(order_details_id, onSuccess, onError) {
                    var id = order_details_id;
                    var order_id = this.order_id;
                    var product_ref = this.product_ref;
                    var unit_price = this.unit_price;
                    var quantity = this.quantity;

                    OrderDetails.update({
                            order_id: order_id,
                            product_ref: product_ref,
                            unit_price: unit_price,
                            quantity: quantity
                        },
                        {where:{id: id}})
                        .then(onSuccess).catch(onError);
                },

                removeById: function(order_details_id, onSuccess, onError){
                    var id = order_details_id;
                    OrderDetails.destroy({where:{id: id}})
                        .then(onSuccess).catch(onError);
                }
            }
        }
    ); return OrderDetails;
};