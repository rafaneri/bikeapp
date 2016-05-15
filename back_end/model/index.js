/**
 * Created by rafaelneri on 10/05/16.
 */
var config = require('../config/server');
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

mongoose.connect('mongodb://' + config.connection.server + ':' + config.connection.port + '/' + config.connection.database, options, function(err, res) {
    if(err) {
        console.log('error connecting to MongoDB Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});
var conn = mongoose.connection; 

conn.on('error', function(){
	console.log('connection error:');
});  

conn.once('open', function() {
  console.log('open');                         
});

module.exports.Feature = require('./feature');
module.exports.mongoose = mongoose;