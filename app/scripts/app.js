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
    'ngTouch'
  ])
  .value('baseUrl', 'https://nsi-prenota-v2.azurewebsites.net')
  .config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
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
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($http, baseUrl, Auth) {
    $http.get(baseUrl + '/api/Stanza').then(function () {
      Auth.isLoggedIn(true);
    }, function() {
      Auth.isLoggedIn(false);
    });
  });
