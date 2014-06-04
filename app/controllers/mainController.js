'use strict';

app.controller('MainController', function($scope){
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    slides.push({
        image : 'web/img/1bunker_vpn_flcnrdge.jpg',
        text : 'This is awesome'
    });
    slides.push({
       image : 'web/img/9.JPG',
       text : 'This is awesome too!'
    });
    slides.push({
       image : 'web/img/CoralCanyonPar311th.JPG',
       text : 'Woo hoo!'
    });
    slides.push({
       image : 'web/img/FalconRidge12.jpg',
       text : 'Yeee Haaaawwww!'
    });
});
