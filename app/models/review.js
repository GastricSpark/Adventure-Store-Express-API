/**
 * app/models/review.js
 * Created by HWhewell on 10/12/2015.
 */

// define model
module.exports = function(sequelize, DataTypes){
    var Review = sequelize.define('reviews',{
            product_ref: DataTypes.STRING,
            stars: DataTypes.INTEGER,
            body: DataTypes.STRING,
            author: DataTypes.STRING
        },
        {
            instanceMethods: {
                retrieveAll: function(onSuccess, onError){
                    Review.findAll({})
                        .then(onSuccess).catch(onError);
                },

                retrieveById: function(review_id, onSuccess, onError){
                    var id = review_id;
                    Review.find({where: {id: id}})
                        .then(onSuccess).catch(onError);
                },

                add: function(onSuccess, onError){
                    var product_ref = this.product_ref;
                    var stars = this.stars;
                    var body = this.body;
                    var author = this.author;

                    Review.build({product_ref: product_ref, stars: stars, body: body, author: author})
                        .save().then(onSuccess).catch(onError);
                },

                updateById: function(review_id, onSuccess, onError) {
                    var id = review_id;
                    var product_ref = this.product_ref;
                    var stars = this.stars;
                    var body = this.body;
                    var author = this.author;

                    Review.update({product_ref: product_ref, stars: stars, body: body, author: author},
                        {where:{id: id}})
                        .then(onSuccess).catch(onError);
                },

                removeById: function(review_id, onSuccess, onError){
                    var id = review_id;
                    Review.destroy({where:{id: id}})
                        .then(onSuccess).catch(onError);
                }
            }
        }
    );return Review;
};