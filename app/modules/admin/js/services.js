'use strict'

angular.module('golfersTube.admin.services', [])
/**
 * Service to handle courses
 */
.factory('courseService', ['$http', '$q', function($http, $q){
    return{
        getCourses : function(){
            var deferred = $q.defer();
            $http.get('service/rest/course/get').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        insertCourse : function(course){
            var fd = new FormData();
            fd.append('image', course.image);
            fd.append('name', course.name);
            fd.append('addressLine1', course.addressLine1);
            fd.append('addressLine2', course.addressLine2);
            fd.append('city', course.city);
            fd.append('state', course.state.code);
            fd.append('zip', course.zip);
            fd.append('phone', course.phone);

            $http.post('service/rest/course/create', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            ).
                success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
                });
        }
    }
}])

/**
 * Service to handle tournaments
 */
.factory('tournamentService', ['$http', '$q', function($http, $q){
    return{
        getTournaments : function(){
            var deferred = $q.defer();
            $http.get('service/rest/tournaments/getTournaments').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        createTournament : function(tournament){
            var fd = new FormData();
            fd.append('startDate', tournament.startDate);
            fd.append('sponsorName', tournament.sponsorName);
            fd.append('tournamentName', tournament.tournamentName);
            fd.append('firstName', tournament.firstName);
            fd.append('lastName', tournament.lastName);
            fd.append('courseId', tournament.courseId.courseId);
            fd.append('email', tournament.email);
            fd.append('phoneNumber', tournament.phoneNumber)
            fd.append('image', tournament.image);

            $http.post('service/rest/tournaments/createTournament', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            ).
                success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
                });

        }
    }
}]);