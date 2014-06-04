app.factory('tournamentService', function($http, $q){
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
});