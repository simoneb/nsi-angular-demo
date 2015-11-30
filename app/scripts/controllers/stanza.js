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

    stanza.eventSources = [];

    stanza.calendarConfig = {
      calendar: {
        lang: 'it',
        timezone: 'local',
        header: {
          left: 'month agendaWeek agendaDay',
          center: 'title'
        },
        viewRender: function (view) {
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
    }

    function convertPeriodiStatoToCalendarEvents(acc, periodoStato) {
      if (acc.length) {
        acc[acc.length - 1].Fine = periodoStato.Inizio;
      }

      return acc.concat(periodoStato);
    }

    function loadPeriodiStato(start, end) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/Stanza/' + id + '/PeriodiStato',
        params: { inizio: start.toDate(), fine: end.toDate() }
      }).then(function (res) {
        stanza.eventSources[0] =
          res.data
            .reduce(convertPeriodiStatoToCalendarEvents, [])
            //.filter(function (evento) {
            //  return evento.Stato !== 2;
            //})
            .map(function (evento) {
              return {
                title: getTitle(evento),
                start: new Date(evento.Inizio),
                end: new Date(evento.Fine || end.toDate())
              };
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
