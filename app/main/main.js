'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/home');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    }).state('main.home', {
        url: '/home',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/home.html',
            controller: 'mainPage as main'
          }
        }
      })
      .state('main.list', {
        url: '/singleNews/:news',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            controller: 'listPage as list'
          }
        }
      })
      .state('main.listDetail', {
        url: '/listDetail/:link',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'listDetail as detail'
          }
        }
      });
});
