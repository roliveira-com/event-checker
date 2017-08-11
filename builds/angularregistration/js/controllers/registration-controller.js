roliveira.controller('RegistrationController',['$scope', '$auth', 
	function($scope,$auth){

	$scope.login = function(){
		$auth.login($scope.user);
	}

	$scope.logout = function(){
		$auth.logout();
	}

	$scope.register = function(){
		$auth.cadastrar($scope.user);		
	}

}])