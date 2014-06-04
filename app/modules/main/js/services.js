angular.module('golfersTube.main.services', [])

    .factory('reservationService', ['$http', function($http){
        return{
            createRequest : function(request){
                var fd = new FormData();

                fd.append('name', request.name);
                fd.append('email', request.email);
                fd.append('phoneNumber', request.phone);
                fd.append('courseName', request.course);
                fd.append('courseLocation', request.course);



                $http.post('service/rest/tournaments/serviceReservation', fd,
                    {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }
                ).success(function(response){
                }).error(function(data){
                });
            }
        }
    }])
    .factory('menuService', ['$http', '$q', function($http, $q){
        return{
            getMenu : function(){
                var deferred = $q.defer();
                $http.get('service/rest/menu/get')
                    .success(function(response){
                        return deferred.resolve(response);
                    }).error(function(data){

                    });
                return deferred.promise;
            }
        }
    }])





;



