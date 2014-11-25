'use strict';

var sample = angular.module('sample.student-service', []);

sample.value('students', {1: {"id": 1, "name": "Sample Student"}, 2: {"id": 2, "name": "Another Student"}});
sample.factory('studentService', ['$q', '$timeout', 'students', function($q, $timeout, students) {
  // search student with matching partial name
  var getStudents = function(partialName) {
    var matches = [];
    angular.forEach(students, function(student, key) {
      if (partialName === "" || partialName === undefined) {
        // no search term, push the student
        matches.push(student);
      } else if (student.hasOwnProperty("name")) {
        // only compare if student have name property
        var name = student["name"];
        if (name.toLowerCase().indexOf(partialName.toLowerCase()) > -1) {
          matches.push(student);
        }
      }
    })
    var deferred = $q.defer();
    $timeout(function() {
      deferred.resolve(matches);
    }, 500);
    return deferred.promise;
  };

  // get a student using the student's id
  var getStudent = function(id) {
    var deferred = $q.defer();
    $timeout(function() {
      deferred.resolve(students[id]);
    }, 500);
    return deferred.promise;
  };
  // add new student
  var addStudent = function(student) {
    var max = 0;
    angular.forEach(students, function(student, key) {
      if (max < key) {
        max = key;
      }
    });
    student["id"] = max + 1;
    // assign the student to the students map object
    students[max + 1] = student;
    var deferred = $q.defer();
    $timeout(function() {
      deferred.resolve(student);
    }, 500);
    return deferred.promise;
  };
  // update a student
  var updateStudent = function(student) {
    if (student.hasOwnProperty("id")) {
      var id = student["id"];
      students[id] = student;
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(student);
      }, 500);
      return deferred.promise;
    }
  };
  // remove a student
  var removeStudent = function(student) {
    if (student.hasOwnProperty("id")) {
      var id = student["id"];
      delete students[id];
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(student);
      }, 500);
      return deferred.promise;
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
