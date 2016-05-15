var models = require('../model');
var geoWrapper = require('../util/geowrapper');
var Q = require('q');
var GeographicLib = require("geographiclib");
var Geodesic = GeographicLib.Geodesic,
    DMS = GeographicLib.DMS,
    geod = Geodesic.WGS84;
    
function buildRoute(o, d) {
    var deferred = Q.defer();
    var routeResult = {};

    models.Feature.findNearPoint(o).then(function(result) {
        if (result != null) {
            routeResult['p1'] = result;
            if (routeResult['p2']) {
                deferred.resolve(geoWrapper(o, routeResult['p1'], routeResult['p2'], d));
            }
        } else {
            deferred.reject('Erro to generate route');
        }
    }, function(err) {
        deferred.reject(err);
    });
    
    models.Feature.findNearPoint(d).then(function(result) {
        if (result != null) {
            routeResult['p2'] = result;
            if (routeResult['p1']) {
                deferred.resolve(geoWrapper(o, routeResult['p1'], routeResult['p2'], d));
            }
        } else {
            deferred.reject('Erro to generate route');
        }
    }, function(err) {
        deferred.reject(err);
    });
    
    return deferred.promise;
}

function listAllFavorite() {
    var deferred = Q.defer();
    models.Feature.find({}, function(err, result) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

module.exports = { buildRoute: buildRoute, listAllFavorite: listAllFavorite };