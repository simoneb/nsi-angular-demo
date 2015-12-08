'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:InvitiCtrl
 * @description
 * # InvitiCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('InvitiCtrl', function (inviti, baseUrl, $http, $route) {
    this.inviti = inviti.data.map(function (invito) {
      return angular.extend(invito, {
        Prenotazione_Inizio: new Date(invito.Prenotazione_Inizio),
        Prenotazione_Fine: new Date(invito.Prenotazione_Fine)
      });
    });

    this.accept = function(invito) {
      return $http.post(baseUrl + '/api/Invito/' + invito.Id + '/Accetta').then(function() {
        $route.reload();
      });
    };

    this.reject = function(invito) {
      return $http.post(baseUrl + '/api/Invito/' + invito.Id + '/Rifiuta').then(function() {
        $route.reload();
      });
    };
  });
