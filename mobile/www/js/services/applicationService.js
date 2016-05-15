angular
    .module('woole')
    .factory('ApplicationService', ['UtilService', function(UtilService) {
        return {
            buildMapRoute: function(o, d) {
                var data = {o:o, d:d};
                return UtilService.buildPostRequest('/map', data, 'An error occured while fetching the route');
            },
            listAllFavorite: function() {
                return UtilService.buildGetRequest('/favorites', [], 'An error occured while fetching the favorites');
            },
            findAddress: function(address) {
                return UtilService.buildGetRequest('/geo', [address], 'An error occured while fetching the address');
            }
        }
    }]);
