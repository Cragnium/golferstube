app.factory('courseService', function($http, $q){
    return{
        getCourses : function(){
            var deferred = $q.defer();
            $http.get('service/rest/course/get').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
            });

            return deferred.promise;
        },
        getCourse : function(courseId){
            var deferred = $q.defer();
            $http.get('service/rest/course/'+courseId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

            });
        },
        insertCourse : function(course){
            var fd = new FormData();
            fd.append('image', course.image);
            fd.append('name', course.name);
            fd.append('addressLine1', course.addressLine1);
            fd.append('addressLine2', course.addressLine2);
            fd.append('city', course.city);
            fd.append('state', course.state.code);
            fd.append('zip', course.zip);
            fd.append('phone', course.phone);

            $http.post('service/rest/course/create', fd,
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