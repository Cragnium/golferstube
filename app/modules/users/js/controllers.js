'use strict'

angular.module('golfersTube.users.controllers', [])

/**
 * Get the list of lessons for the user
 */
.controller('MyLessons', ['$scope', 'lessons', function($scope, lessons){
    $scope.lessons = [];

    angular.forEach(lessons, function(lesson){
        $scope.lessons.push(
            {
                HasBeenRead : lesson.hasBeenRead,
                RequestedDate : lesson.requestedDate,
                CompletedDate : lesson.completedDate,
                Tournament : lesson.tournament.tournamentName,
                Pro : lesson.pro.person.firstName + ' ' + lesson.pro.person.lastName
            });
    });

    $scope.gridOptions = {
        data : 'lessons',
        afterSelectionChange : function(index, lesson){
            alert("Here!");
        },
        showFooter: true,
        columnDefs :[{field : "HasBeenRead", displayName : 'Read?', width:150},
            {field : "RequestedDate", displayName : 'Date Requested', cellFilter : 'date:shortDate', width:150},
            {field : "CompletedDate", displayName : 'Date Completed', cellFilter : 'date:shortDate', width:150},
            {field : "Tournament", width:150},
            {field : "Pro", width:150}]
    };
}])
/**
 * Get the list of videos for the user
 */
.controller('MyVideos', ['$scope', 'userVideos', function($scope, userVideos){
    $scope.userVideos = [];

    angular.forEach(userVideos, function(video){
        $scope.userVideos.push(
        {
            name : video.video.videoName,
            description : video.video.description,
            rating : video.averageRating,
            numberOfComments : video.videoCommentCount,
            videoType : video.video.category.code,
            dateAdded : video.video.dateUploaded
        });
    });

    $scope.gridOptions = {
        data : 'userVideos',
        afterSelectionChange : function(index, video){
            alert("Here!");
        },
        columnDefs : [{field : 'name', displayName : 'Video Name'},
            {field : 'description', displayName : 'Description'},
            {field : 'rating', displayName : 'Average Rating'},
            {field : 'numberOfComments', displayName : 'Number of Comments'},
            {field : 'videoType', displayName : 'Video Type'},
            {field : 'dateAdded', displayName : 'Date Added', cellFilter : 'date:shortDate'}]
    };

}])
/**
 * Get the detail for a specific video
  */
.controller('MyVideoDetail', ['$scope', 'userVideo', function($scope, userVideo){
    $scope.userVideo = userVideo;
    $scope.videoSource = "http://localhost:8080/golferstube/" + userVideo.video.directoryName + "/" + userVideo.video.fileName;
    $scope.timesRated = userVideo.oneStarRatings + userVideo.twoStarRatings + userVideo.threeStarRatings + userVideo.fourStarRatings +
        userVideo.fiveStarRatings + userVideo.sixStarRatings + userVideo.sevenStarRatings + userVideo.eightStarRatings +
        userVideo.nineStarRatings + userVideo.tenStarRatings;
}])
/**
 * Account controller
  */
.controller('AccountController', ['$scope', 'userService', 'userId', function($scope, userService, userId){

    $scope.user = userService.getUser(userId);
    $scope.user.then(
        function(user){
            //check user type and such
        },
        function(response){
            //do error stuff
        }
    );

}])
/**
 * Edit the user account
 */
.controller('EditAccountController', ['$scope', 'userService', function($scope, userService){
    $scope.user = {};

    $scope.insertUser = function(user, form){
        if(form.$valid){
            userService.save(user)
                .then(
                function(response){},
                function(response){}
            )
        }
    }

    $scope.cancelEdit = function(){
        window.location("/EditUser.htlm");
    }
}])
/**
 * Create a user account
 */
.controller('CreateAccountController', ['$scope', 'usersService', 'states', 'genders', 'countries', function($scope, usersService, states, genders, countries){
    $scope.states = states;
    $scope.genders = genders;
    $scope.countries = countries;

    $scope.insertUser = function(user){
        usersService.insertUser(user);
    }
}])
/**
 * Edit user account
 */
.controller('EditAccountController', ['$scope', 'states', 'genders', 'countries', 'usersService', function($scope, states, genders, countries, usersService){
    $scope.states = states;
    $scope.genders = genders;
    $scope.countries = countries;

    /*
     usersService.getUser(1).then(function(user){
     $scope.user = user;
     })
     */
}])

.controller('ViewLesson', ['$scope', 'lesson', function($scope, lesson){
    $scope.lesson = lesson;
    $scope.lesson.lessonTextArray = lesson.lessonText.split('\r\n');
    $scope.lesson.lessonTextArray = lesson.lessonTextArray.filter(Boolean);
}])
.controller('ViewUserDashboard', ['$scope', '$location', function($scope, $location){


    $scope.viewMyFavorites = function(){
        $location.url('/viewFavorites');

    };

    $scope.viewCompleted = function(){
        $location.url('/myLessons');
    };

    $scope.viewTips = function(){
         $location.url('/userTips');
    };

    $scope.viewComments = function(){
         $location.url('/userComments');
    };

    $scope.viewAccountInfo = function(){
          $location.url('/editAccount');
    };
}])
.controller('ViewFavorites', ['$scope', function($scope){

}])
.controller('UserComments', ['$scope', function($scope){

}])
;




