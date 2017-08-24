roliveira.factory('$api',['$rootScope','$scope','$firebaseObject','$firebaseAuth','$firebaseArray',function($rootScope,$scope,$firebaseObject,$firebaseAuth,$firebaseArray){

	//base ref database
	var userCheck_ref = firebase.database().ref()
	 	.child('usuarios').child($scope.whichUser)
	 	.child('eventos').child($scope.whichEvent)
	 	.child('checkins');

	var service;

	service = {

		addCheckin: function(){
	 		$firebaseArray(userCheck_ref).$add({
	 			nome: $scope.user.firstname,
	 			sobrenome: $scope.user.lastname,
	 			email: $scope.user.email,
	 			data: firebase.database.ServerValue.TIMESTAMP	
	 		})
	 		.then(function(response){
	 			$location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichEvent + '/	checkinslist')
	 		})
	 		.catch(function(error){
	 			console.log(error);
	 		})
		}

	}

	return service;

}])