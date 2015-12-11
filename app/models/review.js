/**
 * app/models/review.js
 * Created by HWhewell on 10/12/2015.
 */

// call the packages we need
var sequelize = require('sequelize');

// define model
module.exports = function(sequelize, DataType){
    return Review = sequelize.define('reviews',{
            product_ref: DataType.STRING,
            stars: DataType.INTEGER,
            body: DataType.STRING,
            author: DataType.STRING
        },
        {
            instanceMethod: {
                retrieveAll: function(onSuccess, onError){
                    Review.findAll({}, {raw: true})
                        .success(onSuccess).error(onError);
                },

                retrieveByid: function(review_id, onSuccess, onError){
                    var id = review_id;
                    Review.find({where: {id: id}}, {raw: true})
                        .success(onSuccess).error(onError);
                },

                add: function(onSuccess, onError){
                    var product_ref = this.product_ref;
                    var stars = this.stars;
                    var body = this.body;
                    var author = this.author;

                    Review.build({product_ref: product_ref, stars: stars, body: body, author: author})
                        .save().success(onSuccess).error(onError);
                },

                updateById: function(review_id, onSuccess, onError) {
                    var id = review_id;
                    var product_ref = this.product_ref;
                    var stars = this.stars;
                    var body = this.body;
                    var author = this.author;

                    Review.update({product_ref: product_ref, stars: stars, body: body, author: author},
                        {where:{id: id}})
                        .success(onSuccess).error(onError);
                },

                removeById: function(review_id, onSuccess, onError){
                    var id = review_id;
                    Review.destroy({where:{id: id}})
                        .success(onSuccess).error(onError);
                }
            }
        }
    );
};