'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('angularYoDemoApp'));

  // instantiate service
  var Auth;

  beforeEach(inject(function (_Auth_) {
    Auth = _Auth_;
  }));

  it('should create service', function () {
    expect(Auth).toBeDefined();
  });

});
