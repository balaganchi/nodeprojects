var app = angular.module('app', []);

app.controller('getContact',['$scope','$http', function($scope, $http){

	console.log('Controller is Ready');
	
	var refresh =  function(){
		$http.get('/contactlist').success(function(response){
			console.log('Getting GET reply from server');
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);		
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log('Contact added successfully');
			refresh();
		});
	};

	$scope.removeContact = function(id){
		console.log('Remove Contact with id: ' + id);
		$http.delete('/contactlist/' + id).success(function(response){
			console.log('Contact deleted successfully');
			refresh();
		});
	};

	$scope.editContact = function(id){
		console.log('Edit Contact with id: ' + id);
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
		
	}


	$scope.updateContact = function(){
		console.log('Update Contact with id' + $scope.contact._id);
		console.log($scope.contact);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

}]);