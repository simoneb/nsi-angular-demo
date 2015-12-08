'use strict';

describe('Controller: InvitiCtrl', function () {

  // load the controller's module
  beforeEach(module('angularYoDemoApp'));

  var InvitiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvitiCtrl = $controller('InvitiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InvitiCtrl.awesomeThings.length).toBe(3);
  });
});
