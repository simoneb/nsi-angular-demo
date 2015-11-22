'use strict';

describe('Controller: StanzaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularYoDemoApp'));

  var StanzaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StanzaCtrl = $controller('StanzaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StanzaCtrl.awesomeThings.length).toBe(3);
  });
});
