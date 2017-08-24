roliveira.factory('$api',['$rootScope','$location','$auth',function($rootScope,$location,$auth){

	var apiservice;

	apiservice = {

		addCheckin: function(userId,eventId){

			if($rootScope.currentUser){

				var checkin = {
					nome: $rootScope.currentUser.firstname,
					sobrenome: $rootScope.currentUser.lastname,
					email: $rootScope.currentUser.email,
					data: firebase.database.ServerValue.TIMESTAMP
				};

				var newCheckinKey = firebase.database().ref().child('eventos/'+eventId+'/checkins').push().key;
				console.log('A key deste check-in será: '+newCheckinKey);

				var updates = {};
				updates['usuarios/'+userId+'/eventos/'+eventId+'/checkins/'+newCheckinKey] = checkin;
				updates['eventos/'+eventId+'/checkins/'+newCheckinKey] = checkin;

				firebase.database().ref().update(updates)
					.then(function(success){
						$location.path('checkins/'+userId+'/'+eventId+'/checkinslist');
					})
					.catch(function(error){
						console.log(error);
					})			
						
			} else {

				$rootScope.message = "É preciso estar logado para fazer Check-in";

			}



		}

	}

	return apiservice;

}])