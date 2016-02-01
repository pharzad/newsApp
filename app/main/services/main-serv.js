'use strict';
angular.module('main')
    .service('mainServices', function ($http) {

        var share = {};
        share.try = 0;
        share.getSources = function () {
            return $http.get('http://portofsolutions.com:8080/news').then(function (res) {
                return res.data;
            });
        };

        return share;

    });


angular.module('main').factory('FeedService', ['$http', function ($http) {
    return {
        parseFeed: function (url) {
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }

    };
}]);
