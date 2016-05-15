var geocoderProvider = 'openstreetmap';
var httpAdapter = 'http';
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);
var Q = require('q');

function searchAddress(a) {
    var deferred = Q.defer();
    geocoder.geocode(a, function(err, result) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}

module.exports = {searchAddress: searchAddress};