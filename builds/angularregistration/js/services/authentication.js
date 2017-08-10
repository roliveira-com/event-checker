roliveira.factory('$auth',['$rootScope','$firebaseAuth', function($rootScope,$firebaseAuth){
		
		var ref = firebase.database().ref(); 
		var auth = $firebaseAuth();

		return {
			
			login: function(user){
				$rootScope.message = "Bem Vindo " + $rootScope.user.email;
			},

			cadastrar: function(user){

				auth.$createUserWithEmailAndPassword(user.email, user.password
				).then(function(regUser){
					
					$rootScope.message = "Bem vindo " + user.firstname;
					console.log(regUser);
				
				}).catch(function(error){
					
					$rootScope.message = error.message;
					console.log(error);
				
				});

			}

		}

}])