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
    $scope.students = students.data;
  });

  $scope.removeStudent = function(studentId) {
    // we could make this simpler by:
    // * changing the signature method for removeStudent(studentId)
    // * not displaying the name of the student we want to delete

    // or we could also make this simpler by:
    // * iterating the students to find one with matching id
    angular.forEach($scope.students, function(student) {
      if (student["id"] === studentId) {
        if ($window.confirm("Do you really want to delete '" + student["name"] + "'?")) {
          studentService.removeStudent(student).then(function() {
            studentService.getStudents($scope.search).then(function(students) {
              $scope.students = students.data;
            });
          });
        }
      }
    });
  }
}]);
