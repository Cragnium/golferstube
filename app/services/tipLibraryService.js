app.factory('tipLibraryService', function($http, $q){
    return{
        getCategories : function(proId){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/getCategories/'+proId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        getSubcategories : function(proId, categoryId){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/getSubcategories/'+proId+'/categoryId/'+categoryId).success(function(response){
                deferred.resolve(response);
            }).error(function(data){

                });
            return deferred.promise;
        },

        getTips : function(proId){
            var deferred = $q.defer();
            $http.get('service/rest/tipLibrary/'+proId,
                {
                    proId : proId
                }).success(function(response){
                deferred.resolve(response);
            }).error(function(data){
            });

            return deferred.promise;
        },


        createTipCategory : function(tipCategory){
            $http.post('service/rest/tipLibrary/createTipCategory',
                {
                    name : tipCategory.name,
                    description : tipCategory.description,
                    proId : tipCategory.proId
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
                    proId : tipSubcategory.proId,
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
            fd.append('pro', tip.proId);
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
        }
    }
});