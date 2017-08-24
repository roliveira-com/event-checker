roliveira.controller('CheckinController',['$api','$rootScope','$scope','$routeParams','$firebaseObject','$firebaseAuth','$firebaseArray','$location',function($api,$rootScope,$scope,$routeParams,$firebaseObject,$firebaseAuth,$firebaseArray,$location){

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
	 		var refComments = ref.child(myCheckin.$id).child('comments');
	 		var checkinsArray = $firebaseArray(refComments);
	 		checkinsArray.$add({
	 			text: myComment,
	 			authorId : $rootScope.currentUser.regUser,
	 			authorName: $rootScope.currentUser.firstname+' '+$rootScope.currentUser.lastname,
	 			data: firebase.database.ServerValue.TIMESTAMP
	 		})
	 	}

	 	$scope.deleteComment = function(myCheckin,key){
	 		var refComments = ref.child(myCheckin.$id).child('comments').child(key);
	 		var record = $firebaseObject(refComments);
	 		record.$remove(key);
	 	}


	 	$scope.addCheckin = function(){
	 		$auth.addCheckin($scope.whichUser,$scope.whichEvent);
	 	};

	 	$scope.deleteCheckin = function(id){
	 		var refSpecEvent = ref.child(id);
	 		var delCheckin = $firebaseObject(refSpecEvent);
	 		delCheckin.$remove(id);
	 	};


}])//roliveira.controller