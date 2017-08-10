roliveira.controller('RegistrationController',['$rootScope','$scope','$auth', 
	function($rootScope,$scope,$auth){

	$rootScope.message = "Bem Vindo ao roliveira app";
	$scope.user = {};

	$scope.login = function(){
		$auth.login($scope.user);
	}

	$scope.register = function(){
		$auth.cadastrar($scope.user);		
	}

}])