/**
 * app/models/index.js
 * Created by HWhewell on 11/12/2015.
 */

var Sequelize = require('sequelize');

// database connection
var sequelize = new Sequelize(
    'adventure_store',
    'Harry',
    'Password123',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: console.log,
        define: {
            timestamps: true
        }
    });

//load models
var models = [
    'user',
    'review',
    'spell',
    'weapon',
    'apparel',
    'order',
    'orderDetail'
];

models.forEach(function(model){
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// export connection
module.exports.sequelize = sequelize;