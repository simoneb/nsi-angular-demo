'use strict';

/**
 * @ngdoc service
 * @name angularYoDemoApp.notifications
 * @description
 * # notifications
 * Service in the angularYoDemoApp.
 */
angular.module('angularYoDemoApp')
  .factory('notifications', function (Hub, baseUrl, toastr, $http) {
    return new Hub('mainHub', {
      rootPath: baseUrl + '/signalr',
      listeners: {
        notificaPrenotazione: notificaPrenotazione,
        notificaInvitoAccettato: notificaInvitoAccettato,
        notificaInvitoRifiutato: notificaInvitoRifiutato,
        notificaInvitoRicevuto: notificaInvitoRicevuto
      },
      logging: true
    });

    function notificaPrenotazione(prenotazione) {
      $http.get(baseUrl + '/api/Stanza/' + prenotazione.StanzaId)
        .then(function (res) {
          toastr.info('In ' + res.data.Nome + ' il ' + new Date(prenotazione.Inizio).toDateString(), 'Nuova prenotazione');
        });
    }

    function notificaInvitoAccettato(invito) {
      $http.get(baseUrl + '/api/Utente/' + invito.InvitatoId)
        .then(function (res) {
          toastr.success(res.data.Nome + ' ' + res.data.Cognome + ' ha accettato un invito :)', 'Invito accettato!');
        });
    }

    function notificaInvitoRifiutato(invito) {
      $http.get(baseUrl + '/api/Utente/' + invito.InvitatoId)
        .then(function (res) {
          toastr.error(res.data.Nome + ' ' + res.data.Cognome + ' ha rifiutato un invito :(', 'Invito rifiutato!');
        })
    }

    function notificaInvitoRicevuto(invito) {
      toastr.info('Hai ricevuto un invito', 'Invito ricevuto');
    }
  });
