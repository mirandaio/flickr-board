'use strict';

angular.module('flickrBoard.controllers', [])
.controller('MainController', ['$scope', 'Paging', function($scope, Paging) {
  var paging = new Paging(1, 5);

  function updateViewModel(response) {
    $scope.photos = response.data.photos.photo;
    $scope.rangeStart = response.rangeStart;
    $scope.rangeEnd = response.rangeEnd;
    $scope.total = response.data.photos.total;
  }

  $scope.hasPrevious = paging.hasPrevious;
  $scope.hasNext = paging.hasNext;

  $scope.previousPage = function() {
    paging.previousPage().then(function(response) {
      updateViewModel(response);
    });
  };

  $scope.nextPage = function() {
    paging.nextPage().then(function(response) {
      updateViewModel(response);
    });
  };

  $scope.sortByTitle = function() {
    $scope.photos.sort(function(photo1, photo2) {
      var title1 = photo1.title.toLowerCase();
      var title2 = photo2.title.toLowerCase();
      return title1.localeCompare(title2);
    });
  };

  paging.getPage().then(function(response) {
    updateViewModel(response);
  });
}]);
