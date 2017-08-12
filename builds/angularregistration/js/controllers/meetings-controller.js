roliveira.controller('MeetingsController',['$rootScope','$scope','$firebaseAuth','$firebaseArray',function($rootScope,$scope,$firebaseAuth,$firebaseArray){

	var ref = firebase.database().ref(); 
	var auth = $firebaseAuth();

	auth.$onAuthStateChanged(function(authUser){
		if(authUser){
			var eventsRef = ref.child('usuarios').child(authUser.uid).child('eventos');
			var eventsInfo = $firebaseArray(eventsRef);
			
			$scope.events = eventsInfo;

			eventsInfo.$loaded().then(function(data){
				$rootScope.howManyEvents = eventsInfo.length;
			});

			eventsInfo.$watch(function(){
				$rootScope.howManyEvents = eventsInfo.length;
			})

			$scope.deleteEvento = function(key){
				eventsInfo.$remove(key);
			};

			$scope.addEvento = function(){
				eventsInfo.$add({
					nome: $scope.eventname,
					date: firebase.database.ServerValue.TIMESTAMP
				}).then(function(){
					$scope.eventname = '';
				})
			}
		}
	});	//auth.$onAuthStateChanged

}])//roliveira.controller