roliveira.controller('eventsListController',['$rootScope','$scope','$firebaseArray',function($rootScope,$scope,$firebaseArray){
		$rootScope.message = '';

		// acessando a database no firebase
		var ref = firebase.database().ref(); 

		//declarando o array que conterá os objetos dos eventos
		$scope.appEventsList = [];

		//gerando array com todos os usuários na database e usando o método $loaded() para retornar uma promessa
		$firebaseArray(ref.child('usuarios')).$loaded()

		  .then(function(respo) {
		    
		    //após o sucesso da promise, interando em casa usuario vendo se há eventos cadastrados
				respo.forEach(function(userValue,userKey){
					
					//caso haja eventos...
					if(userValue.eventos){

						//...iterar neste objeto com o forEach() para gerar um objeto para cada evento
						angular.forEach(userValue.eventos, function(eventValue,eventKey){
							 
							//iniciando objeto que abrigará os dados deste evento
							var obj = {};

							//configurando as propriedades do objeto do evento
							obj.id 			= eventKey;
							obj.nome 		= eventValue.nome;
							obj.data 		= eventValue.date;
							obj.authorId 	= userValue.regUser;
							obj.authorName 	= userValue.firstname+' '+userValue.lastname;

							//monta propriedade que informa se o ususario logad	o e autor deste evento
							if($rootScope.currentUser){
								if(userValue.regUser == $rootScope.currentUser.$id){
									obj.isOwner = true;
								}else{
									obj.isOwner = false;
								}
							}

							//inserindo o objeto do evento dentro do array especificado abaixo
							this.push(obj);

						}, $scope.appEventsList); //array do evento onde os objetos de evento serão inserido após a iteração
					
					} // if 
				
				}); //forEach dos usuarios

				console.log($scope.appEventsList)
				
		  }) //promisse resolved from $loaded 
		  
		  .catch(function(error) {
		    
		    console.log("Error:", error);
		  
		  });

		  $scope.doCheckin = function(record){
		  	var checkinTo = ref.child('usuarios').child(record.authorId).child('eventos').child(record.id).child('checkins');
		  	var doingCheckin = $firebaseArray(checkinTo);
		  	if ($rootScope.currentUser) {
			  	doingCheckin.$add({
			  		nome: $rootScope.currentUser.firstname,
			  		sobrenome: $rootScope.currentUser.lastname,
			  		email: $rootScope.currentUser.email,
			  		data: firebase.database.ServerValue.TIMESTAMP
			  	})
		  	}else{
		  		$rootScope.message = "É preciso estar logado para fazer Check-in";
		  	}
		  }

}]);