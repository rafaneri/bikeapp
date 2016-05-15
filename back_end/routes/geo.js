var express = require('express');
var router = express.Router();
var geo = require('../business/geo');

module.exports = function() {
    var r = {
        router: router,
        searchAddress: function(req, res, next) {
            var address = req.params.a;
            
            geo.searchAddress(address).then(function(result) {
                res.json(result);
            }, function(err) {
                next(err);
            })
        }
    };
    
    r.router.route('/geo/:a')
        .get(r.searchAddress);
    
    return r;
}