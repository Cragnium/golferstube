angular.module('golfersTube.main.controllers', [])
    .controller('MenuController', ['$scope', '$rootScope', 'menuService', function($scope, $rootScope, menuService){
     var loadMenu = function(){
        menuService.getMenu().then(function(menu){
           $scope.menu = menu;
        });
    };

    $rootScope.$watch('user', loadMenu);

    loadMenu();
}])

.controller('MainController', ['$scope', '$location', function($scope, $location){
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    slides.push({
        image : 'web/img/FalconRidge12.jpg'/*,
         text : 'This is awesome'*/
    });
    slides.push({
        image : 'web/img/SandHollowResort13New.jpg'/*,
         text : 'This is awesome too!'*/
    });
    /*
     slides.push({
     image : 'web/img/CoralCanyonPar311th.JPG'*/
    /*,
     text : 'Woo hoo!'*//*

     });
     slides.push({
     image : 'web/img/FalconRidge12.jpg'*/
    /*,
     text : 'Yeee Haaaawwww!'*//*

     });
     */

    $scope.tournamentServices = function(){
        $location.url('/tournamentServices')
    };

    $scope.login = function(){
        $location.url('/login')
    };

    $scope.bookUs = function(){
        $location.url('/tournamentServices')
    };

    $scope.rateMySwing = function(){
        $location.url('/rateMySwing');
    };

    $scope.uploadVideo = function(){
        $location.url('/uploadVideo');
    };
}])
.controller('TournamentService', ['$scope', 'reservationService', '$location', function($scope, reservationService, $location){
        $scope.requestService  = function(request){
            reservationService.createRequest(request);
            alert("Your request has been submitted");
            $location.url('/view1');
        }

    }])
.controller('UploadVideoInfo', ['$scope', function($scope){

}])
.controller('ServiceReservations', ['$scope', 'reservationService', '$location', function($scope, reservationService, $location){
        $scope.requestService  = function(request){
            reservationService.createRequest(request);
            alert("Your request has been submitted");
            $location.url('/view1');
        }


}])
.controller('RateMySwing', ['$scope', function($scope){
    $scope.max = 10;


    $scope.hoveringOver = function(value){
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    }

    var kiddingTabs = [{
        name : 'Highest Rated',
        type : 'kidding'
    }, {
        name : 'Lowest Rated',
        type : 'kidding'
    }, {
        name : 'New Additions',
        type : 'kidding'
    }];

    var swingTabs = [{
        name : 'Highest Rated',
        type : 'swing'
    }, {
        name : 'Lowest Rated',
        type : 'swing'
    }, {
        name : 'New Additions',
        type : 'swing'
    }];

    $scope.outerTabs = [{
        name : "You're Kidding Me",
        tabs : kiddingTabs
    }, {
        name : 'Swing Videos',
        tabs : swingTabs
    }];

    $scope.clickTab = function(innerTab){
        alert(innerTab.name + innerTab.type);
    };

    $scope.highestRatedKidding = function(){
        alert("Highest Rated Kidding");
    };

    $scope.lowestRatedKidding = function(){
        alert("Lowest Rated Kidding");
    };

    $scope.newAdditionKidding = function(){
        alert("New Addition Kidding");
    };

    $scope.highestRatedSwing = function(){
        alert("Highest Rated Swing");
    };

    $scope.lowestRatedSwing = function(){
        alert("Lowest Rated Swing");
    };

    $scope.newAdditionSwing = function(){
        alert("New Addition Swing");
    };
}]);
