'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:StanzaCtrl
 * @description
 * # StanzaCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('StanzaCtrl', function ($routeParams, baseUrl, $http, $log) {
    var stanza = this;
    var id = $routeParams.id;

    stanza.eventSources = [];

    stanza.calendarConfig = {
      calendar: {
        viewRender: function (view, element) {
          loadPeriodiStato(view.start, view.end);
        }
      }
    };

    loadStanzaData();

    function loadStanzaData() {
      $http.get(baseUrl + '/api/Stanza/' + id)
        .then(function (res) {
          stanza.stanza = res.data;
        });

      $http.get(baseUrl + '/api/Disponibilita/')
        .then(function (res) {
          stanza.disponibilita = res.data;
        });
    }

    function loadPeriodiStato(start, end) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/Stanza/' + id + '/PeriodiStato',
        params: { inizio: start.toDate(), fine: end.toDate() }
      }).then(function (res) {
        stanza.eventSources[0] = res.data
          .filter(function (evento) {
            return true || evento.stato == 2;
          }).map(function (evento) {
            return {
              title: getTitle(evento),
              start: new Date(evento.Inizio),
              allDay: true
            }
          });
      });
    }

    function getTitle(evento) {
      switch (evento.Stato) {
        case 0:
          return 'Non disponibile';
        case 1:
          return 'Occupata';
        case 2:
          return 'Disponibile';
      }
    }
  });
