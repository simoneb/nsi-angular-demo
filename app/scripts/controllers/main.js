'use strict';

/**
 * @ngdoc function
 * @name angularYoDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularYoDemoApp
 */
angular.module('angularYoDemoApp')
  .controller('MainCtrl', function ($http, $uibModal, $route, baseUrl, Auth, stanze, utenti) {
    var main = this;

    main.eventSources = [[], []];
    main.stanze = stanze.data;
    main.utenti = utenti.data;

    main.calendarConfig = {
      calendar: {
        timezone: 'UTC',
        header: {
          left: 'month agendaWeek agendaDay',
          center: 'title'
        },
        viewRender: function (view) {
          loadDisponibilita(view.start, view.end);
          loadPrenotazioni(view.start, view.end);
        },
        eventClick: handleEventClick
      }
    };

    function handleEventClick(event) {
      console.log(event);

      $uibModal.open({
        templateUrl: 'eventModal.html',
        controller: function () {
          this.event = event;
          this.createdEvent = {
            start: event.start.toDate(),
            end: event.end.toDate()
          };
        },
        controllerAs: 'modal',
        bindToController: true
      }).result.then(function (createdEvent) {
        $http.post(baseUrl + '/api/Prenotazione', {
          CreatoreId: Auth.getUser().Id,
          StanzaId: event.roomId,
          Inizio: createdEvent.start,
          Fine: createdEvent.end
        }).then(function () {
          $route.reload();
        });
      });
    }

    function loadPrenotazioni(start, end) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/Prenotazione',
        params: { inizio: start.toDate(), fine: end.toDate() }
      }).then(function (res) {
        main.eventSources[0] =
          res.data
            .map(function (evento) {
              return {
                roomId: evento.StanzaId,
                title: getRoomName(evento) + ' (prenotata)',
                available: false,
                start: new Date(evento.Inizio),
                end: new Date(evento.Fine)
              };
            });
      });
    }

    function loadDisponibilita(start, end) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/Disponibilita',
        params: { inizio: start.toDate(), fine: end.toDate() }
      }).then(function (res) {
        main.eventSources[1] =
          res.data
            .map(function (evento) {
              return {
                roomId: evento.StanzaId,
                roomName: getRoomName(evento),
                title: getRoomName(evento) + ' (disponibile)',
                available: true,
                start: new Date(evento.Inizio),
                end: new Date(evento.Fine)
              };
            });
      });
    }

    function getRoomName(evento) {
      return main.stanze.filter(function (stanza) {
        return stanza.Id === evento.StanzaId;
      })[0].Nome;
    }
  });
