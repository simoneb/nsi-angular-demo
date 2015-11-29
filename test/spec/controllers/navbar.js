'use strict';

describe('Controller: NavbarctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularYoDemoApp'));

  var NavbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


});
