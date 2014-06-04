angular.module('golfersTube.pros.services', [])

    .factory('lessonService', ['$http', '$q', function($http, $q){
    return{
        saveAndNext : function(lesson){
            var fd = new FormData();
            fd.append('lessonId', lesson.lessonId);
            fd.append('lessonText', lesson.lessonText);

            $http.post('service/rest/lesson/giveLesson', fd,
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
            return this.nextLesson(lesson.pro.proId);
        },
        nextLesson : function(proId){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getNextLesson/' + proId)
                .success(function(response){
                    return deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        createLesson : function(lesson){
            var fd = new FormData();
            fd.append('email', lesson.email);
            fd.append('tournamentId', lesson.tournament.tournamentId);
            fd.append('video', lesson.video);

            $http.post('service/rest/lesson/createLessonForTourney', fd,
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

        } ,
        getPendingLessons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getAllPendingLessons').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        getCompletedProLessons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/completedLessons/pro').
                success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },
        getLessonsForStudent : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/allLessonsForStudent').
                success(function(response){
                    deferred.resolve(response);
                })
                .error(function(data){});

            return deferred.promise;
        },
        getPendingProLessons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getPendingLessonsForPro').
                success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });
            return deferred.promise;
        },

        getPendingStudentLessons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getAllPendingLessons').success(function(response){ //TODO not sure if I should change the service/rest/less to getAllPendingStudentLessons KB.
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        markLessonAsRead : function(lessonId){
            $http.put('service/rest/markLessonAsRead',
                {
                    lessonId: lessonId
                }
            ).
                success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
                });
        },

        getLesson : function(lessonId){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/getLesson/'+lessonId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },
        numberCompletedLessonsForPro : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/numberCompletedLessonsForPro').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },
        numberPendingLessonsForPro : function(){
            var deferred = $q.defer();
            $http.get('service/rest/lesson/numberPendingLessonsForPro').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        }
    }
}])


.factory('proService', ['$q', '$http', function($q, $http){
    return{
        getPros : function(){
            var deferred = $q.defer();
            $http.get('service/rest/pros/get').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        getCurrentPro : function(){
          var deferred = $q.defer();
            $http.get('service/rest/pros/currentPro').success(function(response){
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
            fd.append('lessonSalutation', pro.lessonSalutation);

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
        },
        createCoupon : function(coupon){
            var fd = new FormData();
            fd.append('location', coupon.course.courseId);
            fd.append('name', coupon.name);
            fd.append('image', coupon.image);
            fd.append('limits', coupon.limits);
            fd.append('valid', coupon.valid);
            fd.append('date', coupon.date);

            $http.post('service/rest/pros/createCoupon', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            ).success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
                });
        },
        getAllCoupons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/pros/coupons').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        getCoupon : function(coupon){
            var deferred = $q.defer();
            $http.get('service/rest/pros/coupon/'+coupon.couponId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        getActiveCoupons : function(){
            var deferred = $q.defer();
            $http.get('service/rest/pros/coupons/active').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        getProCourses : function(){
            var deferred = $q.defer();
            $http.get('service/rest/pros/courses').success(function(response){
                deferred.resolve(response);
            }).error(function(data){
                });

            return deferred.promise;
        },
        getCouponCount : function(){
            var deferred = $q.defer();
            $http.get('service/rest/pros/coupon/count').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });

            return deferred.promise;

        }

    }

}])

.factory('tipLibraryService', ['$http', '$q', function($http, $q){
    return{
        getCategories : function(){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/getCategories/').success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        getSubcategories : function(categoryId){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/getSubcategories/categoryId/'+categoryId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        getTips : function(){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){
                });

            return deferred.promise;
        },
        getTipsForSubcategory : function(subcategory){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/getTips/subcategoryId/'+subcategory).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

            });
            return deferred.promise;
        },
        getNumberOfTips : function(){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/numberOfTips')
                .success(function(response){
                    deferred.resolve(response);
                }).error(function(data){

                });

            return deferred.promise;
        },


        createTipCategory : function(tipCategory){
            $http.post('service/rest/tipLibrary/createTipCategory',
                {
                    name : tipCategory.name,
                    description : tipCategory.description //,
                }
            ).
                success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
                });

        },

        createTipSubcategory : function(tipSubcategory, categoryId){
            $http.post('service/rest/tipLibrary/createTipSubcategory',
                {
                    name : tipSubcategory.name,
                    description : tipSubcategory.description,
                    categoryId : categoryId
                }
            ).
                success(function(response){
                    //do success function
                }).
                error(function(response){
                    //do failure function
                });

        },

        createTip : function(subcategory, tip){
            var fd = new FormData();
            fd.append('name', tip.name);
            fd.append('tip', tip.tip);
            fd.append('subcategory', subcategory);
            fd.append('video', tip.video);

            $http.post('service/rest/tipLibrary/createTip', fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
            ).
                success(function(response){

                }).
                error(function(response){

                });
        },

        updateTipCategory : function(tipCategory){
            var fd = new FormData();
            fd.append('tipCategoryId', tipCategory.categoryId);
            fd.append('name', tipCategory.name);
            fd.append('description', tipCategory.description);

            $http.put('service/rest/tipLibrary/updateTipCategory', fd,
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

        updateTipSubcategory : function(tipSubcategory){
            var fd = new FormData();
            fd.append('tipSubcategoryId', tipSubcategory.subcategoryId);
            fd.append('name', tipSubcategory.name);
            fd.append('description', tipSubcategory.description);

            $http.put('service/rest/tipLibrary/updateTipSubcategory', fd,
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

}]);