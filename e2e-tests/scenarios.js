'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('sample', function() {

  browser.get('index.html');

  it('should automatically redirect to /students when location hash / fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/students');
  });


  describe('create student', function() {

    beforeEach(function() {
      // prepare the new student
      browser.get('index.html#/newStudent');
    });

    it('should cancel creating new student.', function() {
      element(by.id('cancel-edit')).click();
      expect(browser.getLocationAbsUrl()).toMatch('/students');
    });

    it('should create new student and navigate to /students', function() {
      element(by.model('student.name')).sendKeys("Just Student");
      element(by.id('save-student')).click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('/students');
        element.all(by.css('tr')).getText().then(function(data) {
          expect(data).toContain('Just Student');
        });
      });
    });
  });

  describe('update student', function() {

    beforeEach(function() {
      // prepare the student
    });
  });
});
