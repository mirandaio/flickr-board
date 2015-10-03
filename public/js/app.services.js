'use strict';

angular.module('flickrBoard.services', [])
.factory('Paging', ['$http', function($http) {
  var endPoint = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos';
  var apiKey = 'a5e95177da353f58113fd60296e1d250';
  var userId = '132365033@N08';
  return function(page, perPage) {
    var numPages;

    this.getPage = function() {
      return $http.get(endPoint, {
        params: {
          api_key: apiKey,
          user_id: userId,
          format: 'json',
          nojsoncallback: 1,
          page: page,
          per_page: perPage
        }
      }).then(function(response) {
        numPages = response.data.photos.pages;
        response.rangeStart = perPage * (page - 1) + 1;
        response.rangeEnd = response.rangeStart + response.data.photos.photo.length - 1;
        return response;
      });
    };

    this.nextPage = function() {
      page = page < numPages ? page + 1 : page;
      return this.getPage();
    };

    this.previousPage = function() {
      page = page > 1 ? page - 1 : page;
      return this.getPage();
    };

    this.hasPrevious = function() {
      return page > 1;
    };

    this.hasNext = function() {
      return page < numPages;
    }
  };
}]);
