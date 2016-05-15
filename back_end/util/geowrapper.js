function geoWrapper(o, p1, p2, d) {
    var routeWaypoints = {
        "type": "LineString",
        "properties": {
            "waypoints":[
                {"coordinates":[o.longitude, o.latitude], "name": o.streetName},
                {"coordinates":[p1.geometry.coordinates[0], p1.geometry.coordinates[1]], "name": p1.properties.name},
                {"coordinates":[p2.geometry.coordinates[0], p2.geometry.coordinates[1]], "name": p2.properties.name},
                {"coordinates":[d.longitude, d.latitude], "name": d.streetName}
            ]
        }
    };
    
    return routeWaypoints;
}

module.exports = geoWrapper;