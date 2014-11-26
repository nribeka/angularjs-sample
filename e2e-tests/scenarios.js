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

  });
});
