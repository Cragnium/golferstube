app.factory('genderService', function($http, $q){
    return{
        getGenders : function(){
            var deferred = $q.defer();
            $http.get('service/rest/gender/').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
            });

            return deferred.promise;
        }
    }
});