roliveira.controller('CheckinController',['$apiCheckin','$rootScope','$scope','$routeParams','$firebaseObject','$firebaseAuth','$firebaseArray','$location',function($apiCheckin,$rootScope,$scope,$routeParams,$firebaseObject,$firebaseAuth,$firebaseArray,$location){

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
	 	};

	 	$scope.showComentBox = function(myCheckin){
	 		myCheckin.show = !myCheckin.show;
	 		if(myCheckin.userState == 'expanded'){
	 			myCheckin.userState = '';
	 		}else{
	 			myCheckin.userState = 'expanded';
	 		}
	 	}
	 	

	 	$scope.postComment = function(myCheckin, myComment){
	 		$apiCheckin.postCheckinComments($scope.whichUser,$scope.whichEvent,myCheckin.$id,myComment);
	 	}
	 	

	 	$scope.deleteComment = function(myCheckin,key){
	 		$apiCheckin.deleteCheckinComments($scope.whichUser,$scope.whichEvent,myCheckin.$id,key)
	 	}


	 	$scope.addCheckin = function(){
	 		$apiCheckin.addCheckin($scope.whichUser,$scope.whichEvent);
	 	};

	 	$scope.deleteCheckin = function(id){
	 		$apiCheckin.deleteCheckin($scope.whichUser,$scope.whichEvent,id)
	 	};


}])//roliveira.controller