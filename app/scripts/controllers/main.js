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

    main.stanze = stanze.data;
    main.utenti = utenti.data;
    main.eventSources = Array.apply(null, Array(main.stanze.length)).map(function() { return [] });

    var roomsColors = main.stanze.map(getRandomColor);

    main.calendarConfig = {
      calendar: {
        header: {
          left: 'month agendaWeek agendaDay',
          center: 'title'
        },
        viewRender: function (view) {
          loadPeriodiStato(view.start, view.end);
        },
        eventClick: handleEventClick
      }
    };

    function handleEventClick(event) {
      if(!event.available) return;

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

    function convertPeriodiStatoToCalendarEvents(acc, periodoStato) {
      if (acc.length) {
        acc[acc.length - 1].Fine = periodoStato.Inizio;
      }

      return acc.concat(periodoStato);
    }

    function loadPeriodiStato(start, end) {
      main.stanze.forEach(function(stanza, stanzaIdx) {
        $http({
          method: 'GET',
          url: baseUrl + '/api/Stanza/' + stanza.Id + '/PeriodiStato',
          params: { inizio: start.toDate(), fine: end.toDate() }
        }).then(function (res) {
          main.eventSources[stanzaIdx] =
            res.data
              .reduce(convertPeriodiStatoToCalendarEvents, [])
              .filter(function(evento) {
                return evento.Stato !== 0;
              })
              .map(function (evento) {
                return {
                  roomId: stanza.Id,
                  roomName: stanza.Nome,
                  available: evento.Stato === 2,
                  color: evento.Stato === 1 ? 'grey' : roomsColors[stanzaIdx],
                  title: stanza.Nome + ' (' + getTitle(evento) + ')',
                  start: new Date(evento.Inizio),
                  end: new Date(evento.Fine || end.toDate())
                };
              });
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

    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  });
