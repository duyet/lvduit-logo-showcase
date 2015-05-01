'use strict';

angular.module('lvduitHerokuLogoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.logos = [];

    $http.get('/api/logo').success(function(logos) {
      $scope.logos = logos;
    });
  });
