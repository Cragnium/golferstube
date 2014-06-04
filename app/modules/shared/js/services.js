angular.module('golfersTube.shared.services', [])

.factory('countryService', ['$http', '$q', function($http, $q){
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
}])

.factory('genderService', ['$http', '$q', function($http, $q){
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
}])


.factory('stateService', ['$http', '$q', function($http, $q){
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
}]);