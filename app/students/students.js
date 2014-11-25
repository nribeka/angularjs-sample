'use strict';

angular.module('sample.students', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/students', {
    templateUrl: 'students/students.html',
    controller: 'StudentsCtrl'
  });
}])

.controller('StudentsCtrl', ['$scope', 'studentService', function($scope, studentService) {
  $scope.students = studentService.getStudents("");

  $scope.$watch('search', function (newValue, oldValue) {
    if (newValue != oldValue) {
      // if using ajax, then this assignment should be done on the success
      // because the service will return a http promise.
      $scope.students = studentService.getStudents(newValue);
    }
  }, true);
}]);
