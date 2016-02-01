'use strict';
angular.module('main')
    .controller('MenuCtrl', function ($scope, mainServices) {
        mainServices.getSources().then(function (sources) {
            $scope.sources = sources;
        });
    });

angular.module('main')
    .controller('mainPage', function ($scope, FeedService, $state, mainServices, $timeout) {

        function getTopThree(feed, img) {
            var topthree = [];

            for (var i = 0; i < 3; i++) {
                topthree.push({
                    title: feed.responseData.feed.entries[i].title,
                    img: img,
                    link: feed.responseData.feed.entries[i].link
                });
            }

            return topthree;
        }

        $scope.try = mainServices.try;
        if ($scope.try === 0) {
            $timeout(function () {
                if (AdMob) {
                    AdMob.createBanner({
                        adId: 'ca-app-pub-5009956909039505/6131109078',
                        isTesting: false
                    });
                }
                $scope.try = 1;
                mainServices.try = 1;
            }, 4000);
        }
        $scope.goTo = function (link) {
            var url = encodeURIComponent(link);
            $state.go('main.listDetail', {
                link: url
            });
        };



        $scope.topNews = [];

        mainServices.getSources().then(function (sources) {
            angular.forEach(sources, function (source) {
                FeedService.parseFeed(source.feed).then(function (res) {
                    angular.forEach(getTopThree(res.data, source.image), function (compiled) {
                        $scope.topNews.push(compiled);
                    });
                });
            });
        });
    });
//SingleNews List

angular.module('main')
    .controller('listPage', function ($scope, FeedService, mainServices, $stateParams, $state) {

        $scope.goTo = function (link) {
            var url = encodeURIComponent(link);
            $state.go('main.listDetail', {
                link: url
            });
        };

        $scope.news = [];

        if (angular.isDefined($stateParams.news)) {
            mainServices.getSources().then(function (sources) {
                angular.forEach(sources, function (source) {
                    if (source.title === $stateParams.news) {
                        FeedService.parseFeed(source.feed).then(function (res) {
                            angular.forEach(res.data.responseData.feed.entries, function (entery) {
                                $scope.news.push({
                                    title: entery.title,
                                    img: source.image,
                                    link: entery.link
                                });

                            });
                        });
                    }
                });
            });
        }
    });

angular.module('main')
    .controller('listDetail', function ($scope, $stateParams, $sce) {
        $scope.link = '';
        if (angular.isDefined($stateParams.link)) {
            $scope.link = $sce.trustAsResourceUrl(decodeURIComponent($stateParams.link));
        }
    });
