app.factory('countryService', function($http, $q){
    return{
        getCountries : function(){
            var deferred = $q.defer();
            $http.get('service/rest/countries/').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
            });

            return deferred.promise;
        }
    }
});