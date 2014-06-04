app.factory('proService', function($resource, $q, $http){
    return{
        getPros : function(){
            var deferred = $q.defer();
            $http.get('service/rest/pros/get').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        getPro : function(proId){
            var deferred = $q.defer();
            $http.get('service/rest/pros/'+proId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        insertPro : function(pro){
            var fd = new FormData();
            fd.append('email', pro.email);
            fd.append('password', pro.password);
            fd.append('screenName', pro.screenName);
            fd.append('userType', 'PRO');
            fd.append('firstName', pro.firstName);
            fd.append('lastName', pro.lastName);
            fd.append('state', pro.state.code);
            fd.append('country', pro.country.code);
            fd.append('businessPhone', pro.businessPhone);
            fd.append('cellPhone', pro.cellPhone);
            fd.append('course', pro.course.id.courseId);
            fd.append('title', pro.title);
            fd.append('title2', pro.title2);
            fd.append('bio', pro.bio);
            fd.append('image', pro.image);
            fd.append('signature', pro.signature);

            $http.post('service/rest/pros/create', fd,
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

       updatePro: function(pro){
           var fd = new FormData();
           fd.append('proId', pro.proId);
           fd.append('email', pro.email);
           fd.append('password', pro.password);
           fd.append('screenName', pro.screenName);
           fd.append('userType', 'PRO');
           fd.append('firstName', pro.firstName);
           fd.append('lastName', pro.lastName);
           fd.append('state', pro.state.code);
           fd.append('country', pro.country.code);
           fd.append('businessPhone', pro.businessPhone);
           fd.append('cellPhone', pro.cellPhone);
           fd.append('course', pro.course.id.courseId);
           fd.append('title', pro.title);
           fd.append('title2', pro.title2);
           fd.append('bio', pro.bio);
           fd.append('image', pro.image);
           fd.append('signature', pro.signature);

           $http.post('service/rest/pros/update', fd,
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