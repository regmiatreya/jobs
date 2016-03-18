
var jobApp = angular.module('jobApp', ['ngRoute','jobControllers']);

  jobApp.config(function ($routeProvider) {
    $routeProvider
      
			.when('/list', {
        templateUrl: 'views/list_job.html',
        controller: 'ListController',
      })
			.when('/list/:jobid', {
        templateUrl: 'views/detail_job.html',
        controller: 'DetailController',
      })
      .when('/edit/:jobid', {
        templateUrl:'views/edit_job.html',
        controller: 'EditController',
      })
      .when('/preview/:jobid', {
        templateUrl: 'views/detail_job.html',
        controller: 'DetailController',
      })
      .when('/create', {
        templateUrl: 'views/create_job.html',
        controller: 'CreateController',
      })
      .otherwise({
        redirectTo: '/list'
      });
  });

