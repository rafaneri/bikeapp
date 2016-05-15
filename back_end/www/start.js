/**
 * Created by rafaelneri on 10/05/2016.
 */
var app = require('../app');
var config = require('../config/server');

var server = app.listen(config.app.port, function() {
  console.log('Express server listening on port ' + config.app.port);
});