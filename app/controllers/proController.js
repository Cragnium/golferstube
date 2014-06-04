'use strict';

app.controller('CreateProController', function($scope, proService, stateService, genderService, countryService, courseService){
    $scope.user = {};
    stateService.getStates().then(function(states){
        $scope.states = states;
    });

    genderService.getGenders().then(function(genders){
        $scope.genders = genders;
    });

    countryService.getCountries().then(function(countries){
        $scope.countries = countries;
    });

    courseService.getCourses().then(function(courses){
        $scope.courses = courses;
    });

    $scope.insertPro = function(pro){
        proService.insertPro(pro);
    }

});

app.controller('ViewProsController', function($scope, proService){
   $scope.pros = {};

    proService.getPros().then(function(pros){
        $scope.pros = pros;
    });

});

app.controller('ViewProInfo',[ '$scope', '$routeParams', 'proService', function($scope, $routeParams, proService){
    $scope.proId = $routeParams.id;
    $scope.pro = {};

    proService.getPro($scope.proId).then(function(pro){
        $scope.pro = pro;
    });

}]);
