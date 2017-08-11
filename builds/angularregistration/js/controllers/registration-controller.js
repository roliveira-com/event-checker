roliveira.controller('RegistrationController',['$scope', '$auth', '$rootScope', function($scope,$auth,$rootScope){

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