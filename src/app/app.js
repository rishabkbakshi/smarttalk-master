

const SmartTalk = angular.module('SmartTalk', [
    "ngRoute"
]);

SmartTalk.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "app/views/home.html",
            controller: "HomeCtrl"
        })
        .when("/session/:id", {
            templateUrl: "app/views/session.html",
            controller: "SessionCtrl"
        })
})