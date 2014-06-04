app.factory('usersService', function($resource, $q, $http){
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
                    gender: user.gender.code,
                    age: user.age,
                    state: user.state.code,
                    country: user.country.code
                }
            ).
                success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
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
       }

    }

});