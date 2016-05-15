angular
    .module('woole', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
           if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])
    .config(function($stateProvider, $urlRouterProvider) {
        
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('app.favorites', {
            url: '/favorites',
            views: {
                'favorites': {
                    templateUrl: 'templates/favorites.html',
                    controller: 'FavoriteController'
                }
            }
        })
        .state('app.ride', {
            url: '/ride',
            views: {
                'ride': {
                    templateUrl: 'templates/ride.html',
                    controller: 'RideController'
                }
            }
        })
        .state('app.route', {
            url: '/routes',
            views: {
                'routes': {
                    templateUrl: 'templates/route.html',
                    controller: 'RouteController'
                }
            }
        })
        
        $urlRouterProvider.otherwise('/app/ride');
       
    });
