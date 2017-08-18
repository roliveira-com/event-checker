roliveira.controller('eventsListController',['$rootScope','$scope','$firebaseArray',function($rootScope,$scope,$firebaseArray){
		
		console.log($rootScope.currentUser);

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

							//configurando as propridades do o bjeto do evento
							obj.id 					= eventKey;
							obj.nome 				= eventValue.nome;
							obj.database 		= eventValue.date;
							obj.authorId 		= userValue.regUser;
							obj.authorName 	= userValue.firstname+' '+userValue.lastname;

							//inseindo o objeto do evento dentro do array especificado abaixo
							this.push(obj);

						}, $scope.appEventsList); //array do evento onde os objetos de evento serão inserido após a iteração
					
					} // if 
				
				}); //forEach dos usuarios
				
		  }) //promisse resolved from $loaded 
		  
		  .catch(function(error) {
		    
		    console.log("Error:", error);
		  
		  });

}]);