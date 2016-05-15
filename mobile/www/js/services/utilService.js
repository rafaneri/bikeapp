angular
    .module('woole')
    .factory('UtilService', ['$http', '$q', function($http, $q) {
        return {
            apiPath: 'http://54.200.242.200:3200/api',        
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