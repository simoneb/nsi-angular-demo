'use strict';

describe('Controller: StanzaCtrl', function () {

  // load the controller's module
  beforeEach(module('angularYoDemoApp'));

  var StanzaCtrl;
  var $httpBackend, baseUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _baseUrl_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    baseUrl = _baseUrl_;

    $httpBackend.expectGET(baseUrl + '/api/Stanza').respond(401);

    StanzaCtrl = $controller('StanzaCtrl', {
      $routeParams: { id: 'abc' }
      // place here mocked dependencies
    });
  }));

  it('should set event sources to an empty array', function () {
    expect(StanzaCtrl.eventSources).toEqual([]);
  });

  it('should request details about room', function () {
    $httpBackend.whenGET(baseUrl + '/api/Stanza/abc').respond({ ciao: 'pippo' });

    $httpBackend.flush();

    expect(StanzaCtrl.stanza).toBeDefined();

    $httpBackend.verifyNoOutstandingExpectation();
  });
});
