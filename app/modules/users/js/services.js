angular.module('golfersTube.users.services', [])

.factory('usersService', ['$resource', '$q', '$http', '$location', function($resource, $q, $http, $location){
    return{
        login : function(user) {
            var deferred = $q.defer();
            $http.post('service/rest/users/login', {
                email : user.email,
                password : user.password
            }).success(function(response){
                    deferred.resolve(response);
                }).error(function(data){
                });
            return deferred.promise;
        },
        getUser : function(userId){
            var deferred = $q.defer();
            $http.get('service/rest/users/'+userId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        insertUser : function(user){
            $http.post('service/rest/users/create',
                {
                    email: user.email,
                    password: user.password,
                    screenName: user.screenName,
                    userType: 'USER',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender != null ? user.gender.code : '',
                    age: user.age,
                    state: user.state != null ? user.state.code : '',
                    country: user.country != null ? user.country.code : ''
                }
            ).
                success(function(response){
                    alert('Your account has been created');
                    $location.url('/login');
                }).
                error(function(response){
                    return false;
                });
        },

        updateUser: function(user){
            var deferred = $q.defer();
            $resource('service/rest/users/:userId/update', {userId: '@userId'}).save({
                    userId: user.userId,
                    email: user.email,
                    password: user.password,
                    screenName: user.screenName,
                    userType: 'USER',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    age: user.age,
                    addressLine1: user.addressLine1,
                    addressLine2: user.addressLine2,
                    city: user.city,
                    state: user.state,
                    zip: user.zip,
                    country: user.country,
                    homePhone: user.homePhone,
                    businessPhone: user.businessPhone,
                    cellPhone: user.cellPhone
                },
                function(response){
                    //do success stuff here
                },
                function(response){
                    //do failure stuff here
                }
            );
        },

        forgotPassword: function(email) {
            var fd = new FormData();
            fd.append('email', email);
            $http.put('service/rest/users/sendPasswordReset', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            ).
                success(function(response){

                        if(response === "true"){
                        $location.url('/forgotPassword/true')

                        }else {
                        $location.url('/forgotPassword/false')
                    }
                }).
                error(function(response){
                    //do failure function
                });
        }

    }

}])

.factory('videoService', ['$q', '$http', function($q, $http){
    return{
        getVideoTypes : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/types').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        uploadVideo : function(video){
            var fd = new FormData();
            fd.append('title', video.title);
            fd.append('description', video.description);
            fd.append('tags', video.tags);
            fd.append('type', video.type.code);
            fd.append('video', video.video);

            $http.post('service/rest/videos/uploadUserVideo', fd,
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
        },
        getUserVideos : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/userVideos')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){
                    //do error function
                });

            return deferred.promise;
        },
        getUserVideo : function(videoId){
            var deferred = $q.defer();
            $http.get('service/rest/videos/userVideo/'+videoId)
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getHighestRatedKidding : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/highestRatedKidding')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getLowestRatedKidding : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/lowestRatedKidding')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getNewAdditionKidding : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/newAdditionKidding')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getHighestRatedSwing : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/highestRatedSwing')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getLowestRatedSwing : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/lowestRatedSwing')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getNewAdditionSwing : function(){
            var deferred = $q.defer();
            $http.get('service/rest/videos/newAdditionSwing')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        }
    }
}]);