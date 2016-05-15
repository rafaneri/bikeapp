angular
    .module('woole')
    .factory('GeoService', ['$http', '$q', 'UtilService', function($http, $q, UtilService) {
        return {
            loadRoute: function(waypoints) {
                var deferred = $q.defer();
                var url = 'http://router.project-osrm.org/viaroute?';
                for(var i=0; i<waypoints.length;i++) {
                    url = url + '&loc=' + waypoints[i].coordinates[1] + ',' + waypoints[i].coordinates[0];
                }
                $http.get(url + '&instructions=false&alt=false').success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject(errMsg);
                });
                return deferred.promise;
            },
            downloadKML: function(geojson) {
                UtilService.buildPostRequest('/kml', geojson, 'An error occured while generating the KML').then(function(result) {
                    var anchor = angular.element('<a/>');
                    anchor.attr({
                        href: 'data:attachment/xml;charset=utf-8,' + encodeURI(result),
                        target: '_blank',
                        download: 'route.kml'
                    })[0].click();
                });
            }
        }
    }]);