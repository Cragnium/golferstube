app.factory('stateService', function($http, $q){
    return{
        getStates : function(){
            var deferred = $q.defer();
            $http.get('service/rest/states/').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
            });

            return deferred.promise;
        }
    }
});