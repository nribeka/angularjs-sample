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
  studentService.getStudents($scope.search).then(function(students) {
    $scope.students = students;
  });

  $scope.removeStudent = function(studentId) {
    // we could make this simpler by:
    // * changing the signature method for removeStudent(studentId)
    // * not displaying the name of the student we want to delete
    studentService.getStudent(studentId).then(function(student) {
      if ($window.confirm("Do you really want to delete '" + student["name"] + "'?")) {
        studentService.removeStudent(student).then(function() {
          studentService.getStudents($scope.search).then(function(students) {
            $scope.students = students;
          });
        });
      }
    });
  }

  $scope.$watch('search', function (newValue, oldValue) {
    if (newValue != oldValue) {
      // if using ajax, then this assignment should be done on the success
      // because the service will return a http promise.
      studentService.getStudents(newValue).then(function(students) {
        $scope.students = students;
      });
    }
  }, true);
}]);
