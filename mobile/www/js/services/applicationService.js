angular
    .module('woole')
    .factory('ApplicationService', ['$http', '$q', function($http, $q) {
        return {
            apiPath: 'http://54.200.242.200:3200/api',
            buildMapRoute: function(o, d) {
                var data = {o:o, d:d};
                return this.buildPostRequest('/map', data, 'An error occured while fetching the route');
            },
            listAllFavorite: function() {
                return this.buildGetRequest('/favorites', [], 'An error occured while fetching the favorites');
            },
            findAddress: function(address) {
                return this.buildGetRequest('/geo', [address], 'An error occured while fetching the address');
            },
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
            buildPostRequest: function(path, args, errMsg) {
                var deferred = $q.defer();
                $http.post(this.buildUrl(path, []), args).success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject(errMsg);
                });
                return deferred.promise;
            },
            buildGetRequest: function(path, args, errMsg) {
                var deferred = $q.defer();
                $http.get(this.buildUrl(path, args)).success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject(errMsg);
                });
                return deferred.promise;
            },
            buildUrl: function(path, params) {
                var queryString = '';
                params.forEach(function(element) {
                    queryString += '/' + element
                }, this);
                return this.apiPath + path + queryString;
            }
        }
    }]);