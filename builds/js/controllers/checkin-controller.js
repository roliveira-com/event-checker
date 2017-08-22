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

	 	$scope.showLove = function(myCheckin){
	 		myCheckin.show = !myCheckin.show;
	 		if(myCheckin.userState == 'expanded'){
	 			myCheckin.userState = '';
	 		}else{
	 			myCheckin.userState = 'expanded';
	 		}
	 	}

	 	$scope.giveLove = function(myCheckin, myGift){
	 		var refLove = ref.child(myCheckin.$id).child('awards');
	 		var checkinsArray = $firebaseArray(refLove);
	 		checkinsArray.$add({
	 			nome: myGift,
	 			data: firebase.database.ServerValue.TIMESTAMP
	 		})
	 	}

	 	$scope.deleteLove = function(myCheckin,key){
	 		var refLove = ref.child(myCheckin.$id).child('awards').child(key);
	 		var record = $firebaseObject(refLove);
	 		record.$remove(key);
	 	}

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