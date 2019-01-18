

const easyRtc = easyrtc;

const SmartTalk = angular.module('SmartTalk', [
    "ui.router"
]);

SmartTalk.config(($urlRouterProvider, $stateProvider) => {
    $stateProvider
        .state({
            name: "session",
            url: "/session",
            templateUrl: "app/views/session.html",
            controller: "SessionCtrl"
        })
        
        $urlRouterProvider.otherwise('/session');
})