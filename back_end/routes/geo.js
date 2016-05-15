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
        },
        downloadKML: function(req, res, next) {
            var geojson = req.body;
            var kml = geo.downloadKML(geojson);
            res.setHeader('Content-disposition', 'attachment; filename=route.kml');
            res.setHeader('Content-type', 'application/xml');
            res.charset = 'UTF-8';
            res.write(result);
            res.end();
        }
    };
    
    r.router.route('/kml')
        .post(r.downloadKML);
    
    r.router.route('/geo/:a')
        .get(r.searchAddress);
    
    return r;
}