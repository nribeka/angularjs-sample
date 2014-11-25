'use strict';

angular.module('sample.students', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/students', {
    templateUrl: 'students/students.html',
    controller: 'StudentsCtrl'
  });
}])

.controller('StudentsCtrl', ['$scope', '$window', 'studentService',
function($scope, $window, studentService) {
  $scope.students = studentService.getStudents($scope.search);

  $scope.removeStudent = function(studentId) {
    var student = studentService.getStudent(studentId);
    if ($window.confirm("Do you really want to delete '" + student["name"] + "'?")) {
      studentService.removeStudent(student);
    }
    $scope.students = studentService.getStudents($scope.search);
  }

  $scope.$watch('search', function (newValue, oldValue) {
    if (newValue != oldValue) {
      // if using ajax, then this assignment should be done on the success
      // because the service will return a http promise.
      $scope.students = studentService.getStudents(newValue);
    }
  }, true);
}]);
