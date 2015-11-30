'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('angularYoDemoApp'));

  var AboutCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    AboutCtrl = $controller('AboutCtrl', {
    });
  }));

  it('should create a property named awesomeThings', function() {
    expect(AboutCtrl.awesomeThings).toBeDefined();
  });


});
