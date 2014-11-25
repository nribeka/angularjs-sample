'use strict';

var sample = angular.module('sample.student-service', []);

sample.value('students', {1: {"id": 1, "name": "Sample Student"}, 2: {"id": 2, "name": "Another Student"}});
sample.factory('studentService', ['students', function(students) {
  // search student with matching partial name
  var getStudents = function(partialName) {
    var matches = [];
    angular.forEach(students, function(student, key) {
      if (partialName === "") {
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
    return matches;
  };
  // add new student
  var addStudent = function(student) {
    student["id"] = students.length;
    // assign the student to the students map object
    students[students.length] = student;
  };
  // update a student
  var updateStudent = function(student) {
    if (student.hasOwnProperty("id")) {
      var id = student["id"];
      students[id] = student;
    }
  };
  // remove a student
  var removeStudent = function(student) {
    if (student.hasOwnProperty("id")) {
      var id = student["id"];
      delete students[id];
    }
  }
  // return the service methods
  return {
    addStudent: addStudent,
    getStudents: getStudents,
    updateStudent: updateStudent,
    removeStudent: removeStudent
  };
}]);
