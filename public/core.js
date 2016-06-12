

var core = angular.module('mainApp', ['chart.js']);

core.controller('mainCtrl',['$scope','mainFactory','$http', function($scope, mainFactory,$http){

/*
The application is going to keep track of a list of objects 'Vehicles' that will have the fields: state, plate, time, and type. 'state' and 'plate' are text fields, 'time' is a javascript time type, and the 'type' will be an enumeration of these possible values: 'Regular', 'Term', and 'Valet'. 
*/

$scope.lotData = function(){

	$scope.totalCount = [];

	

	mainFactory.getRestData('lot').success(
		function(data) {
			$scope.tableData = data.Vehicles;
			$scope.wholeData = data;
			$scope.dataLength = data.Vehicles.length;
			
			
			
	
			
		});
		mainFactory.getRestData('types').success(function(data){
			
			$scope.data = data;
			$scope.emptySpace = data[0];
		});

};
	$scope.labels = ["Empty","Regular", "Valet", "Term"];

	
	$scope.lotData();

    $scope.stateM = {"State" : ""};
	$scope.plateM = {"Plate" : ""};
	$scope.timeM = {"Time" : new Date(1970, 0, 1, 14, 57, 0)};
	$scope.dateM = {"DateT": new Date()};
	$scope.typeM = {"Type" : ""};
	
	$scope.sendVehicle = function() {
        
		
		$scope.data = {
		  State: $scope.stateM.State,
          Plate: $scope.plateM.Plate,
          Time: $scope.timeM.Time,
		  DateT: $scope.dateM.DateT,
          Type: $scope.typeM.Type,
		
		}
		
		
		
		$scope.wholeData.Vehicles[$scope.dataLength] = $scope.data;
		console.log($scope.wholeData);
		
		
		console.log($scope.data);
		
		mainFactory.postRestData("addvehicle", $scope.wholeData );
		
		
		
		
		location.reload();
		
	}
	
	$scope.currentCar = function(number){
		$scope.removeIndex = number;
	
	
	};
	
	
	$scope.deleteCar = function(){
		$scope.wholeData.Vehicles.splice($scope.removeIndex, 1);
		console.log($scope.wholeData);
		
		mainFactory.postRestData("addvehicle", $scope.wholeData );
		location.reload();
	
	
	}




}]);


core.factory('mainFactory', ['$http', function($http){

	function getRestData(url){
		return $http.get('/api/' + url);
	
	}
	
	function postRestData(url ,data){
		return $http.post('/api/' + url, data);
	};

	var factory = {
		getRestData: getRestData,
		postRestData: postRestData
	}
	
	return factory;


}]);