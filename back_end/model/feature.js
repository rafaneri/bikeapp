var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');

var featureSchema = new Schema({
    "type": {
        type: String,
        require: true
    },
    "geometry": {
        "type": {
            type: String,
            require: true
        },
        "coordinates": []
    },
    "properties": {
        "name": {
            type: String,
            require: true
        },
        "styleUrl": {
            type: String
        },
        "styleHash": {
            type: String
        }
    }
});

featureSchema.statics.findNearPoint = function(point) {
    var deferred = Q.defer();
    this.aggregate([
    {
        $geoNear: {
            near: { type: "Point", coordinates: [ point.longitude, point.latitude ] },
            distanceField: "dist.calculated",
            includeLocs: "dist.location",
            num: 1,
            spherical: true
        }
    }
    ], function (err, result) {
        if (err) {
            deferred.reject(err);
        }
        deferred.resolve(result.length > 0 ? result[0] : null);
    });
    return deferred.promise
};

featureSchema.index({ "geometry"  : "2dsphere" });
module.exports = mongoose.model('Feature', featureSchema);