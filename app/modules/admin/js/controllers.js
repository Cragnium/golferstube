'use strict'

angular.module('golfersTube.admin.controllers', [])
/**
 * Controller to create tournaments
 */
.controller('CreateTournament', ['$scope', 'tournamentService', 'courses', function($scope, tournamentService, courses){
    $scope.courses = courses;

    $scope.createTournament =  function(tournament){
        tournamentService.createTournament(tournament);
    }
}])

/**
 * View all the courses
 */
.controller('ViewCoursesController', ['$scope', 'courses', '$location', function($scope, courses, $location){
    $scope.courses = [];

    angular.forEach(courses, function(course){
        $scope.courses.push(
            {
                Id : course.courseId,
                Name : course.name,
                Address : course.address.addressLine1,
                AddressLine2 : course.address.addressLine2,
                City : course.address.city,
                State : course.address.state.description,
                Zip : course.address.zip,
                Phone : course.phoneNumber.value
            });
    });

    $scope.selectedItem = [];

    $scope.gridOptions = {
        data : 'courses',
        selectedItems : $scope.selectedItem,
        afterSelectionChange : function(index, coupon){
            if (index.selected)  {  // I don't know if this is true or just truey
                $location.url('/viewCourseInfo/'+$scope.selectedItem[0].Id);
            }
        },
        multiSelect : false,
        columnDefs :[{field : "Name", width:150},
            {field : "Address", width:150},
            {field : "AddressLine2", width:150, displayName : "Address Line 2"},
            {field : "City", width:150},
            {field : "State", width:150},
            {field : "Zip", width: 150},
            {field : "Phone", width :150}]
    };
}])
/**
 * Create a course
 */
.controller('CreateCourseController', ['$scope', 'states', 'courseService', function($scope, states, courseService){
    $scope.states = states;

    $scope.insertCourse = function(course){
        courseService.insertCourse(course);
    }

}])
/**
 * Create a new lesson
 */
.controller('CreateLesson', ['$scope', 'tournaments', 'lessonService', function($scope, tournaments, lessonService){
    $scope.tournaments = tournaments;

    $scope.createLesson =  function(lesson){
        lessonService.createLesson(lesson);
    }

}]);
