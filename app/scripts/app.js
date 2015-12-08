'use strict';

/**
 * @ngdoc overview
 * @name angularYoDemoApp
 * @description
 * # angularYoDemoApp
 *
 * Main module of the application.
 */
angular
  .module('angularYoDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.calendar',
    'ui.bootstrap'
  ])
  .value('baseUrl', 'https://nsi-prenota-v2.azurewebsites.net')
  .config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          stanze: function (baseUrl, $http) {
            return $http.get(baseUrl + '/api/Stanza');
          },
          utenti: function (baseUrl, $http) {
            return $http.get(baseUrl + '/api/Utente');
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/stanza/:id', {
        templateUrl: 'views/stanza.html',
        controller: 'StanzaCtrl',
        controllerAs: 'stanza'
      })
      .when('/inviti', {
        templateUrl: 'views/inviti.html',
        controller: 'InvitiCtrl',
        controllerAs: 'inviti',
        resolve: {
          inviti: function(baseUrl, $http) {
            return $http.get(baseUrl + '/api/Invito/Ricevuti')
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($http, baseUrl, Auth, $location) {
    $http.get(baseUrl + '/api/Stanza').then(function () {
      Auth.isLoggedIn(true);
    }, function () {
      Auth.isLoggedIn(false);
      $location.path('/login');
    });
  });
