roliveira.factory('$apiCheckin',['$rootScope','$location','$auth',function($rootScope,$location,$auth){

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

		},

		deleteCheckin: function(userId,eventId,id){

			firebase.database().ref('usuarios/'+userId+'/eventos/'+eventId+'/checkins/'+id).remove()
				.then(function(success){
					console.log('Registro removido em: /usuarios/'+userId+'/eventos/'+eventId+'/checkins/'+id)
				})
				.catch(function(error){
					console.log(error)
				})

			firebase.database().ref('eventos/'+eventId+'/checkins/'+id).remove()
				.then(function(success){
					console.log('Registro removido em: /eventos/'+eventId+'/checkins/'+id)
				})
				.catch(function(error){
					console.log(error)
				})

		},

		postCheckinComments: function(userId,eventId,checkinId,comment){

			if($rootScope.currentUser){
				var comments = {
		 			text: comment,
		 			authorId : $rootScope.currentUser.regUser,
		 			authorName: $rootScope.currentUser.firstname+' '+$rootScope.currentUser.lastname,
		 			data: firebase.database.ServerValue.TIMESTAMP
				}

				var newCommentKey = firebase.database().ref().child('eventos/'+eventId+'/checkins/'+checkinId+'/comments').push().key;

				var postComment = {};
				postComment['usuarios/'+userId+'/eventos/'+eventId+'/checkins/'+checkinId+'/comments/'+newCommentKey] = comments;
				postComment['eventos/'+eventId+'/checkins/'+checkinId+'/comments/'+newCommentKey] = comments;

				firebase.database().ref().update(postComment)
					.then(function(success){
						console.log('postou!');
					})
					.catch(function(error){
						console.log(error);
					})

			} else {

				$rootScope.message = "É preciso estar logado para fazer Check-in";

			}

		},

		deleteCheckinComments: function(userId,eventId,checkinId,commentId){
			firebase.database().ref('usuarios/'+userId+'/eventos/'+eventId+'/checkins/'+checkinId+'/comments/'+commentId).remove()
				.then(function(success){
					console.log('Registro removido em: /usuarios/'+userId+'/eventos/'+eventId+'/checkins/'+checkinId+'/comments/'+commentId);
				})
				.catch(function(error){
					console.log(error);
				})

			firebase.database().ref('eventos/'+eventId+'/checkins/'+checkinId+'/comments/'+commentId).remove()
				.then(function(success){
					console.log('Registro removido em: /eventos/'+eventId+'/checkins/'+checkinId+'/comments/'+commentId);
				})
				.catch(function(error){
					console.log(error);
				})
		}

	}

	return apiservice;

}])