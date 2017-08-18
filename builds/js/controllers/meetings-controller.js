roliveira.controller('MeetingsController',['$rootScope','$scope','$firebaseAuth','$firebaseArray','$firebaseObject',function($rootScope,$scope,$firebaseAuth,$firebaseArray,$firebaseObject){

	var ref = firebase.database().ref(); 
	var userAuth = $firebaseAuth();

	userAuth.$onAuthStateChanged(function(authUser){
		if(authUser){
		
			var userRef = ref.child('usuarios').child(authUser.uid);//BUSCANDO O Nó DESTE USUARIO NA BASE... 
			var userObj = $firebaseObject(userRef); ///... MONTANDO O OBJETO DESTE USUARIO E...
			$rootScope.currentUser = userObj; // ...INSERINDO O OBJETO DESTE USUARIO NO ESCOPO ROOT DO APP
			
			var eventsRef = ref.child('usuarios').child(authUser.uid).child('eventos');//BUSCANDO O Nó DOS EVENTOS DESTE USUARIO NA BASE...
			var eventsInfo = $firebaseArray(eventsRef);///...E MONTANDO UM ARRAY DESTE EVENTOS...
			$scope.events = eventsInfo; //...INSERINDO O ARRAY DE EVENTOS NO ESCOPO DO CONTROLLER

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
		}else{
			$rootScope.currentUser = '';
		}
	});	//userAuth.$onAuthStateChanged

}])//roliveira.controller