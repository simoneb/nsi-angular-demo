'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('MainCtrl', function ($http, baseUrl) {
    var main = this;

    $http.get(baseUrl + '/api/Stanza')
      .then(function (res) {
        main.stanze = res.data;
      });
  });
