'use strict';

angular.module('sample.student', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/student/:studentId', {
    templateUrl: 'student/student.html',
    controller: 'EditStudentCtrl'
  });
  $routeProvider.when('/newStudent', {
    templateUrl: 'student/student.html',
    controller: 'StudentCtrl'
  });
}])

.controller('StudentCtrl', ['$scope', '$location', 'studentService',
function($scope, $location, studentService) {
  $scope.editing = false;
  $scope.header = "Creating Student";

  $scope.saveStudent = function() {
    studentService.addStudent($scope.student).then(function() {
      $location.path('#/students');
    });
  }

  $scope.cancelEdit = function() {
    $location.path("#/students");
  }

}])

.controller('EditStudentCtrl', ['$scope', '$location', '$routeParams', 'studentService',
function($scope, $location, $routeParams, studentService) {
  $scope.locked = true;
  $scope.editing = true;
  $scope.header = "Student Record";
  studentService.getStudent($routeParams.studentId).then(function(student) {
    $scope.student = student;
  });

  $scope.editStudent = function() {
    $scope.locked = false;
  }

  $scope.cancelEdit = function() {
    if (!$scope.locked) {
      $scope.locked = true;
    } else {
      $location.path("#/students");
    }
  }

  $scope.saveStudent = function() {
    studentService.updateStudent($scope.student).then(function() {
      $location.path('#/students');
    });
  }

}]);
