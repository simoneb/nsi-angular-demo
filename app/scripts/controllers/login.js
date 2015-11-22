'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('LoginCtrl', function ($http, $location, baseUrl, Auth) {
    this.credentials = {
      username: 'admin',
      password: 'Password1!'
    };

    this.doLogin = function () {
      $http.post(baseUrl + '/api/Account/Login', {
        UserName: this.credentials.username,
        Password: this.credentials.password,
        IsPersistent: true
      }).then(function () {
        $http.get(baseUrl + '/api/Stanza').then(function () {
          $location.path('/');
          Auth.isLoggedIn(true);
        }, function () {
          Auth.isLoggedIn(false);
        });
      }, function () {
        Auth.isLoggedIn(false);
      });
    };
  });
