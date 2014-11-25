'use strict';

// Declare app level module which depends on views, and components
angular.module('sample', ['ngRoute', 'sample.student', 'sample.students', 'sample.student-service']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/students'});
}]);
