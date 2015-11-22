'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:StanzaCtrl
 * @description
 * # StanzaCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('StanzaCtrl', function ($routeParams, baseUrl, $http) {
    var stanza = this;
    var id = $routeParams.id;

    $http.get(baseUrl + '/api/Stanza/' + id)
      .then(function (res) {
        stanza.stanza = res.data;
      });

    $http.get(baseUrl + '/api/Disponibilita/')
      .then(function (res) {
        stanza.disponibilita = res.data;
      });
  });
