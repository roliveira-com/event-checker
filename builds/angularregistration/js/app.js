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
			.when('/events',{
				templateUrl : 'views/meetings.html',
				controller : 'MeetingsController',
				resolve : {
				     	currentAuth: ["$auth", function($auth) {
				        return $auth.requireAuth();
		      		}]
    			}
			})
			.otherwise({
				redirectTo: '/events'
			})
	}])
