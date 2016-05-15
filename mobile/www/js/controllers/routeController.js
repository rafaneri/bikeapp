angular
    .module('woole')
    .controller('RouteController', RouteController);
    
RouteController.$inject = ['$scope', 
        'StorageService'];
        
function RouteController($scope, StorageService) {

    $scope.routes = StorageService.getAll();

}