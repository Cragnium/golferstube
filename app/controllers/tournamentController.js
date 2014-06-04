'use strict';

app.controller('CreateTournament', function($scope, courseService, tournamentService){
    courseService.getCourses().then(function(courses){
        $scope.courses = courses;
    });

    $scope.createTournament =  function(tournament){
        tournamentService.createTournament(tournament);
    }

});
