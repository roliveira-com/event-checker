var roliveira = angular.module('app',['ngRoute','firebase'])

	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/login',{
				templateUrl : 'views/login.html',
				controller : 'RegistrationController'
			})
			.when('/register',{
				templateUrl : 'views/register.html',
				controller : 'RegistrationController'
			})
			.when('/success',{
				templateUrl : 'views/success.html',
				controller : 'SuccessController'
			})
			.otherwise({
				redirectTo: '/login'
			})
	}])
