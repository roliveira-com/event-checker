roliveira.controller('CheckinController',['$rootScope','$scope','$routeParams','$firebaseObject','$firebaseAuth','$firebaseArray',function($rootScope,$scope,$routeParams,$firebaseObject,$firebaseAuth,$firebaseArray){

	 var ref;

	 $scope.whichEvent = $routeParams.mId;
	 $scope.whichUser = $routeParams.uId;

	 ref = firebase.database().ref()
	 	.child('usuarios').child($scope.whichUser)
	 	.child('eventos').child($scope.whichEvent)
	 	.child('checkins');

	 	$scope.addCheckin = function(){
	 		$firebaseArray(ref).$add({
	 			nome: $scope.user.firstname,
	 			sobrenome: $scope.user.lastname,
	 			email: $scope.user.email,
	 			data: firebase.database.ServerValue.TIMESTAMP	
	 		})
	 		.then(function(response){
	 			$rootScope.message = "Check-in feito com sucesso!";
	 			$scope.user = "";
	 		})
	 		.catch(function(error){
	 			console.log(error);
	 		})
	 	}


}])//roliveira.controller