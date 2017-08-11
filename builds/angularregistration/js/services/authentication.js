roliveira.factory('$auth',['$rootScope','$firebaseAuth','$location','$firebaseObject', function($rootScope,$firebaseAuth,$location,$firebaseObject){
		
		var ref = firebase.database().ref(); 
		var auth = $firebaseAuth();

		auth.$onAuthStateChanged(function(authUser){
			if(authUser){
				var userRef = ref.child('usuarios').child(authUser.uid);
				var userObj = $firebaseObject(userRef);
				$rootScope.currentUser = userObj;
			} else{
				$rootScope.currentUser = '';
			};
		});	

		return {
			
			login: function(user){
				
				auth.$signInWithEmailAndPassword(
					user.email,
					user.password
				).then(function(logged){
					$location.path('/success');
				}).catch(function(error){
					$rootScope.message = error.message;
				});

			},

			logout: function(){
				return auth.$signOut();
				console.log('chamou logout()');
			},

			cadastrar: function(user){

				auth.$createUserWithEmailAndPassword(user.email, user.password
				).then(function(regUser){

					var regRef = ref.child('usuarios')
						.child(regUser.uid).set({
							date: firebase.database.ServerValue.TIMESTAMP,
							regUser: regUser.uid,
							firstname: user.firstname,
							lastname: user.lastname,
							email: user.email
						});
					
					$rootScope.message = "Bem vindo " + user.firstname;
				
				}).catch(function(error){
					
					$rootScope.message = error.message;
				
				});

			}

		}

}])