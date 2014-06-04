app.factory('lessonService', function($http, $q){
    return{
        saveAndNext : function(lesson){
            var fd = new FormData();
            fd.append('lessonId', lesson.lessonId);
            fd.append('lessonText', lesson.lessonText);

            $http.post('service/rest/lesson/giveLesson', fd,
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
            return this.nextLesson(lesson.pro.proId);
        },
        nextLesson : function(proId){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getNextLesson/' + proId)
                .success(function(response){
                    return deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        createLesson : function(lesson){
            var fd = new FormData();
            fd.append('email', lesson.email);
            fd.append('tournamentId', lesson.tournament.tournamentId);
            fd.append('video', lesson.video);

            $http.post('service/rest/lesson/createLessonForTourney', fd,
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

        } ,
        getPendingLessons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getAllPendingLessons').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

            });
            return deferred.promise;
        },

        getPendingStudentLessons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getAllPendingLessons').success(function(response){ //TODO not sure if I should change the service/rest/less to getAllPendingStudentLessons KB.
                deferred.resolve(response);
            }).error(function(data){

            });
            return deferred.promise;
        },

        getLesson : function(lessonId){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getLesson/'+lessonId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        }
    }
});