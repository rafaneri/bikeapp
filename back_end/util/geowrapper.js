function geoWrapper(o, p1, p2, d) {
    var routeWaypoints = {
        "type": "LineString",
        "properties": {
            "waypoints":[
                {"coordinates":[o.longitude, o.latitude]},
                {"coordinates":[p1.geometry.coordinates[0], p1.geometry.coordinates[1]]},
                {"coordinates":[p2.geometry.coordinates[0], p2.geometry.coordinates[1]]},
                {"coordinates":[d.longitude, d.latitude]}
            ]
        }
    };
    
    return routeWaypoints;
}

module.exports = geoWrapper;