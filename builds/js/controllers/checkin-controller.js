roliveira.controller('CheckinController',['$rootScope','$scope','$routeParams','$firebaseObject','$firebaseAuth','$firebaseArray','$location',function($rootScope,$scope,$routeParams,$firebaseObject,$firebaseAuth,$firebaseArray,$location){

	 var ref, checkinslist;

	 $scope.whichEvent = $routeParams.mId;
	 $scope.whichUser = $routeParams.uId;
	 
	 $scope.busca = '';
	 $scope.order = 'nome';
	 $scope.direction = null;

	 $scope.recordId = '';


	 ref = firebase.database().ref()
	 	.child('usuarios').child($scope.whichUser)
	 	.child('eventos').child($scope.whichEvent)
	 	.child('checkins');

	 	checkinslist = $firebaseArray(ref);
	 	$scope.checkins = checkinslist;

	 	$scope.pickRandom = function(){
	 		var whichRecord = Math.round(Math.random()*(checkinslist.length - 1));
	 		$scope.recordId = checkinslist.$keyAt(whichRecord);
	 		console.log('picking OK');
	 	};

	 	$scope.addCheckin = function(){
	 		$firebaseArray(ref).$add({
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
	 	};

	 	$scope.deleteCheckin = function(id){
	 		var refSpecEvent = ref.child(id);
	 		var delCheckin = $firebaseObject(refSpecEvent);
	 		delCheckin.$remove(id);
	 	};


}])//roliveira.controller