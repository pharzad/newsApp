'use strict';
angular.module('main')
    .controller('MenuCtrl', function ($log) {

        $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);

    });

angular.module('main')
    .controller('mainPage', function ($scope, FeedService, $state, shateData, $timeout) {

        $scope.try = shateData.try;
        if ($scope.try === 0) {
            $timeout(function () {
                $scope.try = 1;
                shateData.try = 1;
            }, 4000);
        }
    
    console.log($scope.try);
        $scope.goTo = function (link) {
            var url = encodeURIComponent(link);
            $state.go('main.listDetail', {
                link: url
            });
        };

        $scope.topNews = [];
        FeedService.parseFeed('http://rss.cnn.com/rss/cnn_topstories.rss').then(function (res) {
            console.log(res.data);
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[0].title,
                img: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED.png',
                link: res.data.responseData.feed.entries[0].link
            });
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[1].title,
                img: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED.png',
                link: res.data.responseData.feed.entries[1].link
            });
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[2].title,
                img: 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED.png',
                link: res.data.responseData.feed.entries[2].link
            });
        });
        FeedService.parseFeed('http://feeds.bbci.co.uk/news/rss.xml').then(function (res) {
            console.log(res.data);
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[0].title,
                img: 'http://static.bbci.co.uk/frameworks/barlesque/2.88.1/orb/4/img/bbc-blocks-dark.png',
                link: res.data.responseData.feed.entries[0].link
            });
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[1].title,
                img: 'http://static.bbci.co.uk/frameworks/barlesque/2.88.1/orb/4/img/bbc-blocks-dark.png',
                link: res.data.responseData.feed.entries[1].link
            });
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[2].title,
                img: 'http://static.bbci.co.uk/frameworks/barlesque/2.88.1/orb/4/img/bbc-blocks-dark.png',
                link: res.data.responseData.feed.entries[2].link
            });
        });

        FeedService.parseFeed('http://feeds.feedburner.com/euronews/en/home/').then(function (res) {
            console.log(res.data);
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[0].title,
                img: 'https://upload.wikimedia.org/wikipedia/mg/9/9e/EuroNews.png',
                link: res.data.responseData.feed.entries[0].link
            });
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[1].title,
                img: 'https://upload.wikimedia.org/wikipedia/mg/9/9e/EuroNews.png',
                link: res.data.responseData.feed.entries[1].link
            });
            $scope.topNews.push({
                title: res.data.responseData.feed.entries[2].title,
                img: 'https://upload.wikimedia.org/wikipedia/mg/9/9e/EuroNews.png',
                link: res.data.responseData.feed.entries[2].link
            });
        });
    });

//SingleNews List

angular.module('main')
    .controller('listPage', function ($scope, FeedService, $stateParams, $state) {

        $scope.goTo = function (link) {
            var url = encodeURIComponent(link);
            $state.go('main.listDetail', {
                link: url
            });
        };

        $scope.news = [];
        var url = '';
        var img = '';

        if (angular.isDefined($stateParams.news)) {

            switch ($stateParams.news) {
                case 'bbc':
                    url = 'http://feeds.bbci.co.uk/news/rss.xml';
                    img = 'http://static.bbci.co.uk/frameworks/barlesque/2.88.1/orb/4/img/bbc-blocks-dark.png';
                    break;
                case 'cnn':
                    url = 'http://rss.cnn.com/rss/cnn_topstories.rss';
                    img = 'https://pbs.twimg.com/profile_images/508960761826131968/LnvhR8ED.png';
                    break;
                case 'euroNews':
                    url = 'http://feeds.feedburner.com/euronews/en/home/';
                    img = 'https://upload.wikimedia.org/wikipedia/mg/9/9e/EuroNews.png';
                    break;
            }
            if (url !== '') {
                FeedService.parseFeed(url).then(function (res) {
                    angular.forEach(res.data.responseData.feed.entries, function (entery) {
                        $scope.news.push({
                            title: entery.title,
                            img: img,
                            link: entery.link
                        });

                    });
                });
            }
        }
    });

angular.module('main')
    .controller('listDetail', function ($scope, $stateParams, $sce) {
        $scope.link = '';
        console.log(decodeURIComponent($stateParams.link));
        if (angular.isDefined($stateParams.link)) {
            $scope.link = $sce.trustAsResourceUrl(decodeURIComponent($stateParams.link));
        }
    });