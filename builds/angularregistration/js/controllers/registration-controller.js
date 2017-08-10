roliveira.controller('RegistrationController',['$scope', '$firebase', '$auth', 
	function($scope,$firebase,$auth){

	$scope.message = "Bem Vindo ao roliveira app";
	$scope.user = {};

	$scope.login = function(){
		$auth.login($scope.user);
	}

	$scope.register = function(){
		$auth.cadastrar($scope.user);		
	}

}])