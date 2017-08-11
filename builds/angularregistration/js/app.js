var roliveira = angular.module('app',['ngRoute','firebase'])

	.run(['$rootScope','$location',function($rootScope,$location){
		$rootScope.$on('routeChangeError', function(event,next,previous,error){
			if(error === 'AUTH_REQUIRED'){
				$rootScope.message = 'Precisa estar logado para ver aquela página';
				$location.path('/login');
			}
		});
	}])

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
				controller : 'SuccessController',
				resolve : {
		     	currentAuth: ["$auth", function($auth) {
		        return $auth.requireAuth();
      		}]
    		}
			})
			.otherwise({
				redirectTo: '/login'
			})
	}])
