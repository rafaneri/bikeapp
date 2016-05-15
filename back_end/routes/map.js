/**
 * Created by rafaelneri on 10/05/2016.
 */
var express = require('express');
var router = express.Router();
var business = require('../business/map');

module.exports = function() {
    var r = {
        router: router,
        buildRoute: function(req, res, next) {
            var o = req.body.o;
            var d = req.body.d;
            
            business.buildRoute(o, d).then(function(result) {
                res.json(result);
            }, function(err) {
                next(err);
            });
        },
        favoriteRoutes: function(req, res, next) {
            business.listAllFavorite().then(function(result) {
                res.json(result);
            }, function(err) {
                next(err);
            });
        }
    }
    
    r.router.route('/map')
        .post(r.buildRoute);
    r.router.route('/favorites')
        .get(r.favoriteRoutes);

    return r;
};