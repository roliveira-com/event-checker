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
			.when('/checkins/:uId/:mId',{
				templateUrl : 'views/checkins.html',
				controller : 'CheckinController'
			})
			.when('/checkins/:uId/:mId/checkinslist',{
				templateUrl : 'views/checkinlist.html',
				controller : 'CheckinController'
			})
			.when('/register',{
				templateUrl : 'views/register.html',
				controller : 'RegistrationController'
			})
			.when('/events',{
				templateUrl : 'views/meetings.html',
				controller : 'MeetingsController',
				resolve : {
				     	currentAuth: ['$auth', function($auth) {
				        return $auth.requireAuth();
		      		}]
    			}
			})
			.when('/events-list',{
				templateUrl : 'views/events-list.html',
				controller : 'eventsListController'
			})
			.otherwise({
				redirectTo: '/events'
			})
	}])
