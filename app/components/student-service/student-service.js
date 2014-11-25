'use strict';

var sample = angular.module('sample.student-service', []);

sample.constant("rest", "http://localhost:8080/student-rest");
sample.factory('studentService', ['$http', 'rest', function($http, rest) {
  $http.defaults.headers.common['Accept'] = "application/json";
  $http.defaults.headers.common['Content-Type'] = "application/json";
  // search student with matching partial name
  var getStudents = function() {
    return $http({
      method: "GET",
      url: rest + "/students"
    });
  };

  // get a student using the student's id
  var getStudent = function(id) {
    return $http({
      method: "GET",
      url: rest + "/students/" + id
    });
  };
  // add new student
  var addStudent = function(student) {
    return $http({
      method: "POST",
      url: rest + "/students",
      data: student
    });
  };
  // update a student
  var updateStudent = function(student) {
    if (student.hasOwnProperty("id")) {
      var id = student["id"];
      return $http({
        method: "PUT",
        url: rest + "/students/" + id,
        data: student
      });
    }
  };
  // remove a student
  var removeStudent = function(student) {
    if (student.hasOwnProperty("id")) {
      var id = student["id"];
      return $http({
        method: "DELETE",
        url: rest + "/students/" + id
      });
    }
  }
  // return the service methods
  return {
    addStudent: addStudent,
    getStudent: getStudent,
    getStudents: getStudents,
    updateStudent: updateStudent,
    removeStudent: removeStudent
  };
}]);
