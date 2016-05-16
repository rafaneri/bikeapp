angular
    .module('woole')
    .controller('RideController', RideController);
    
RideController.$inject = ['$scope',
        '$q', 
        '$cordovaGeolocation',
        '$stateParams',
        '$ionicModal',
        '$ionicPopup',
        'leafletData',
        'ApplicationService',
        'GeoService',
        'MessageService',
        'StorageService'];
        
function RideController($scope, $q, $cordovaGeolocation, $stateParams, $ionicModal, $ionicPopup, leafletData, ApplicationService, GeoService, MessageService, StorageService) {

    var msgOrigin = 'origem';
    var msgDestination = 'destino';
    var rideMap;
    $scope.geojson;

    $scope.route = {
        origin: {}, 
        destination: {}
    };
    
    $scope.map = {
        defaults: {
        tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        maxZoom: 18,
        zoomControlPosition: 'bottomleft'
        },
        center: {},
        markers : {},
        events: {
            map: {
                enable: ['context'],
                logic: 'emit'
            }
        }
    };
    
    leafletData.getMap('rideMap').then(function(map) {
        rideMap = map;
    });

    $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
        $scope.map.center.lat  = position.coords.latitude;
        $scope.map.center.lng = position.coords.longitude;
        $scope.map.center.zoom = 15;

        $scope.map.markers.now = {
            lat:position.coords.latitude,
            lng:position.coords.longitude,
            focus: true,
            draggable: false,            
            title: 'Localização Atual'            
        };
    }, function(err) {
        alert(MessageService.error.title, err);
    });
    
    $scope.downloadKML = function() {
        GeoService.downloadKML($scope.geojson);
    } 
        
    function findAddress(element, message) {        
        if (element.name) {
            ApplicationService.findAddress(element.name).then(function(result) {
                if (checkAddressResult(result, message)) {                    
                    angular.extend(element, result[0]);
                }
            }, function(err) {
                alertErrorAddressResult(message);
            });
        }
    }
        
    function checkAddressResult(result, message) {
        if (result.length == 0) {
            alert(MessageService.error.title,
                MessageService.concatMessage(MessageService.error.addressNotFound, [message]));
        } else if (result.length > 1) {
            alert(MessageService.error.title, MessageService.concatMessage(MessageService.error.addressManyResults, [message]));
        }
        return result.length == 1;
    }
    
    function alertErrorAddressResult(message) {
        alert(MessageService.error.title,
            MessageService.concatMessage(MessageService.error.addressNotFound, [message]));
    }
    
    function alert(title, template) {
        $ionicPopup.alert({
            title: title,
            template: template
        });
    }
    
    function displayRoute(serverResult) {
        $scope.kml = true;
        var waypoint = serverResult.properties.waypoints;
        $scope.map.center.lat  = waypoint[0].coordinates[1];
        $scope.map.center.lng = waypoint[0].coordinates[0];
        $scope.map.center.zoom = 14;
        $scope.map.markers = {
            origin: {
                lat:waypoint[0].coordinates[1],
                lng:waypoint[0].coordinates[0],
                focus: true,
                draggable: false,            
                title: 'Origem - ' + waypoint[0].name
            },
            p1: {
                lat:waypoint[1].coordinates[1],
                lng:waypoint[1].coordinates[0],
                focus: true,
                draggable: false,            
                title: 'P1 - ' + waypoint[1].name
            },
            p2: {
                lat:waypoint[2].coordinates[1],
                lng:waypoint[2].coordinates[0],
                focus: true,
                draggable: false,            
                title: 'P2 - ' + waypoint[2].name
            },
            destination: {
                lat:waypoint[3].coordinates[1],
                lng:waypoint[3].coordinates[0],
                focus: true,
                draggable: false,            
                title: 'Destino - ' + waypoint[3].name
            }, 
        };
    }
    
    // origem -23.54233, -46.64023
    // destino -23.60185, -46.6607
    function drawRoute(routeParams) {
        // removendo layers geradas pelo polyline
        rideMap.eachLayer(function (layer) {
            if (layer._latlngs) rideMap.removeLayer(layer);
        });
        
        var route = new L.Polyline(L.PolylineUtil.decode(routeParams, 6)); // OSRM polyline decoding
        
        var boxes = L.RouteBoxer.box(route, 10);
        var bounds = new L.LatLngBounds([]);
        var boxpolys = new Array(boxes.length);

        for (var i = 0; i < boxes.length; i++) {
            bounds.extend(boxes[i]);
        }

        route.addTo(rideMap);
        rideMap.fitBounds(bounds);
        
        return route;
    }
    
    function routeAddWayPoints(waypoints, geometry) {
		var wpNames = [],
			wpCoordinates = [],
			i,
			wp;

		for (i = 0; i < waypoints.length; i++) {
			wp = waypoints[i];
			wpNames.push(wp.name);
			wpCoordinates.push([wp.coordinates[0], wp.coordinates[1]]);
		}

		return {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {
						id: 'waypoints',
						names: wpNames
					},
					geometry: {
						type: 'MultiPoint',
						coordinates: wpCoordinates
					}
				},
				{
					type: 'Feature',
					properties: {
						id: 'line',
					},
					geometry: geometry
				}
			]
		};
	}
    
    function loadRoute(serverResult) {
        GeoService.loadRoute(serverResult.properties.waypoints).then(function(result) {
            var route = drawRoute(result.route_geometry);
            $scope.geojson = routeAddWayPoints(serverResult.properties.waypoints, route.toGeoJSON().geometry);
            displayRoute(serverResult);
        }, function(err) {
            alert(MessageService.error.title, err);
        });
    }
    
    $scope.findOriginAddress = function() {
        findAddress($scope.route.origin, msgOrigin);
    };
    
    $scope.findDestinationAddress = function() {
        findAddress($scope.route.destination, msgDestination);
    };
    
    // load route modal
    $ionicModal.fromTemplateUrl('templates/build-route.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    
    $scope.openRouteModal = function() {
        $scope.modal.show();
    }
    
    $scope.buildRoute = function() {
        ApplicationService.buildMapRoute($scope.route.origin, $scope.route.destination).then(function(result) {
            result.name = $scope.route.name;
            StorageService.add(result);
            loadRoute(result);
            $scope.modal.hide();
        }, function(err) {
            alert(MessageService.error.title, err);
        });
    }
}
