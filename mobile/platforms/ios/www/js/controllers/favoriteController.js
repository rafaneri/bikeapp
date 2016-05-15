angular
    .module('woole')
    .controller('FavoriteController', FavoriteController);
    
FavoriteController.$inject = ['$scope', '$ionicPopup', 
        'ApplicationService', 'MessageService'];
        
function FavoriteController($scope, $ionicPopup, ApplicationService, MessageService) {

    ApplicationService.listAllFavorite().then(function(result) {
        $scope.locations = result;
    }, function(err) {
        $ionicPopup.alert({
            title: MessageService.error.title,
            template: err
        });
    });

}