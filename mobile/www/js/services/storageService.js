angular
    .module('woole')
    .factory('StorageService', ['$localStorage', function($localStorage) {
        $localStorage = $localStorage.$default({
            routes: []
        });

        function getAll() {
            return $localStorage.routes;
        };

        function add(route) {
            $localStorage.routes.push(route);
        }

        return {
            getAll: getAll,
            add: add
        };
    }]);