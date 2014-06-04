'use strict';

app.controller('ViewCoursesController', function($scope, courseService){
    $scope.courses;

    courseService.getCourses().then(function(courses){
        $scope.courses = courses;
    });
});

app.controller('ViewCourseInfoController', function($scope, courseService, $routeParams){
    $scope.id = $routeParams.id;

    courseService.getCourse($scope.id).then(function(course){

    });
});


app.controller('CreateCourseController', function($scope, stateService, courseService){
    stateService.getStates().then(function(states){
        $scope.states = states;
    });

    $scope.insertCourse = function(course){
        courseService.insertCourse(course);
    }

});
