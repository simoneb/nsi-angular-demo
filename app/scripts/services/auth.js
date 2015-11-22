'use strict';

/**
 * @ngdoc service
 * @name angularYoDemoApp.Auth
 * @description
 * # Auth
 * Factory in the angularYoDemoApp.
 */
angular.module('angularYoDemoApp')
  .factory('Auth', function ($http, baseUrl) {
    var loggedIn = false,
      user;

    return {
      isLoggedIn: function (value) {
        if (value) {
          $http.get(baseUrl + '/api/Account/UtenteId').then(function (res) {
            $http.get(baseUrl + '/api/Utente/' + res.data).then(function (res) {
              user = res.data;
            });
          });
        }

        if (value !== undefined) {
          loggedIn = value;
        } else {
          return loggedIn;
        }
      },
      getUser: function () {
        return user;
      }
    };
  });
