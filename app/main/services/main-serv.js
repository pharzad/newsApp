'use strict';
angular.module('main')
    .service('shateData', function () {

        var share = {};
        share.try = 0;

        return share;

    });


angular.module('main').factory('FeedService', ['$http', function ($http) {
    return {
        parseFeed: function (url) {
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    };
}]);