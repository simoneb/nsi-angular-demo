'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('NavbarCtrl', function ($location, $http, baseUrl, Auth) {
    var navbar = this;

    navbar.is = function (route) {
      return $location.path() === route;
    };

    navbar.isLoggedIn = Auth.isLoggedIn;

    navbar.logout = function () {
      $http.post(baseUrl + '/api/Account/Logout')
        .then(function () {
          Auth.isLoggedIn(false);
          $location.path('/login');
        });
    };

    navbar.user = Auth.getUser.bind(Auth);
  });
