'use strict';

angular.module('golfersTube.pros.controllers', [])
/**
 * Create a new tip for this pro
 */
.controller('CreateTip', ['$scope', 'tipLibraryService', 'categories', '$route', function($scope, tipLibraryService, categories, $route){
    $scope.categories = categories;



    $scope.createTipCategory = function(tipCategory) {
        tipLibraryService.createTipCategory(tipCategory);
        tipLibraryService.getCategories().then(function(categories){
            $scope.categories = categories;
        });
    }


    $scope.createTipSubcategory = function(subcategory, category){
        if(!category){
            alert("You must pick a tip category");
            return;
        }
        tipLibraryService.createTipSubcategory(subcategory, category.categoryId);
        tipLibraryService.getSubcategories(category.categoryId).then(function(subcategories){
            $scope.subcategories = subcategories;
        });

    }

    $scope.createTip = function(subcategory, tip){
        if(!subcategory){
            alert("You must pick a sub category");
            return;
        }
        tipLibraryService.createTip(subcategory.subcategoryId, tip);
        tipLibraryService.getTipsForSubcategory(subcategory).then(function(tips){
            $scope.tips = tips;
        });
    }

    $scope.$watch('category.categoryId', function(category){
        if (category){
            tipLibraryService.getSubcategories(category.categoryId).then(function(subcategories){
                $scope.subcategories = subcategories;
            });
            $scope.categorySelected = category;
        }
    });

    $scope.$watch('subcategory.subcategoryId', function(subcategory){
        if(subcategory){
            tipLibraryService.getTipsForSubcategory(subcategory.subcategoryId).then(function(tips){
                $scope.tips = tips;
            })
            $scope.subcategorySelected = subcategory;
        }
    });

    $scope.$watch('tip.tipId', function(tip){
        if(tip){
            $scope.tipSelected = tip;
        }
    }) ;

    $scope.reload = function(){
        $route.reload();
    }
}])
/**
 * Create a new pro
 */
.controller('CreateProController', ['$scope', 'states', 'genders', 'countries', 'courses', 'proService',
        function($scope, states, genders, countries, courses, proService){
    $scope.user = {};
    $scope.states = states;
    $scope.genders = genders;
    $scope.countries = countries;
    $scope.courses = courses;

    $scope.insertPro = function(pro){
        proService.insertPro(pro);
    }
}])
/**
 * View all the pros
 */
.controller('ViewProsController', ['$scope', 'pros', '$location', function($scope, pros, $location){
        $scope.pros = [];

        angular.forEach(pros, function(pro){
            $scope.pros.push(
                {
                    Id : pro.proId,
                    Name : pro.person.firstName + " " + pro.person.lastName,
                    Email : pro.user.email,
                    ScreenName : pro.user.screenName,
                    Title : pro.title,
                    Title2 : pro.title2
                });
        });

        $scope.selectedItem = [];

        $scope.gridOptions = {
            data : 'pros',
            selectedItems : $scope.selectedItem,
            afterSelectionChange : function(index, coupon){
                if (index.selected)  {  // I don't know if this is true or just truey
                    $location.url('/viewProInfo/'+$scope.selectedItem[0].Id);
                }
            },
            multiSelect : false,
            columnDefs :[
                {field : "Name", width:250},
                {field : "Email", width:250},
                {field : "ScreenName", displayName : "Screen Name", width:200},
                {field : "Title", width:150},
                {field : "Title2", displayName: "Secondary Title", width: 150}]
        };
}])
/**
 * View a specific pro
  */
.controller('ViewProInfo',[ '$scope', 'pro', function($scope, pro){
    $scope.pro = pro;
}])
/**
 * View all the pro videos
 */
.controller('ViewProVideos', ['$scope', 'proService', function($scope, proService){

}])
/**
 * Add a new pro video
 */
.controller('AddProVideo', ['$scope', 'proService', function($scope, proService){

}])
/**
 * View all the coupons for this pro
 */
.controller('ViewProCoupons', ['$scope', 'coupons', function($scope, coupons){
    $scope.coupons = [];

    angular.forEach(coupons, function(coupon){
        $scope.coupons.push(
            {
                Name : coupon.name,
                Location : coupon.location.name,
                Limits : coupon.limits,
                Valid : coupon.valid,
                Expires : coupon.expires
            });
    });

    $scope.gridOptions = {
        data : 'coupons',
        afterSelectionChange : function(index, coupon){
            alert("Here!");
        },
        showFooter: true,
        columnDefs :[{field : "Name", width:150},
            {field : "Location", width:150},
            {field : "Limits", width:150},
            {field : "Valid", width:150},
            {field : "Expires", cellFilter : 'date:shortDate', width:150}]
    };
}])
/**
 * Add a new coupon
 */
.controller('AddProCoupons', ['$scope', 'courses', 'proService', function($scope, courses, proService){
    $scope.courses = courses;
    $scope.insertCoupon = function(coupon){
        proService.createCoupon(coupon);
    };
}])
/**
 * View all pending lessons in the system
 */
.controller('ViewPendingLessons', ['$scope', 'lessons', function($scope, lessons){
    $scope.lessons = lessons;

    $scope.getProName = function(lesson){
        if (lesson.pro){
            return lesson.pro.firstName + " " + lesson.pro.lastName;
        } else {
            return "Unassigned";
        }
    }
}])
/**
 * View the pro dashboard
 */
.controller('ProDashboard', ['$scope', 'numberOfTips', 'pro', 'numberCompletedLessons', 'numberPendingLessonsForPro', '$location',
        function($scope, numberOfTips, pro, numberCompletedLessons, numberPendingLessonsForPro, $location){
        $scope.numberOfTips = numberOfTips;
        $scope.pro = pro;
        $scope.numberCompletedLessons = numberCompletedLessons;
        $scope.numberPendingLessonsForPro = numberPendingLessonsForPro;

        $scope.viewTipLibrary = function(){
            $location.url('/viewTips');
        }

        $scope.viewCompleted = function(){
            $location.url('/completedLessons/pro');
        }

        $scope.viewPending = function(){
            $location.url('/pendingLessons/pro')
        }

        $scope.viewVideos = function(){

        }

        $scope.viewCoupons = function(){

        }

        $scope.editBio = function(){

        }
}])
/**
 * Give a student a lesson
 */
.controller('GiveLesson', ['$scope', 'lesson', 'tips', 'lessonService', 'tipLibraryService', '$location',
        function($scope, lesson, tips, lessonService, tipLibraryService, $location){
    lesson.lessonText = "";
    $scope.lesson = lesson;
    $scope.proId = lesson.pro.proId;
    $scope.categories = tips;
    $scope.videoSource = lesson.video.directoryName + "/" + lesson.video.fileName;
    $scope.videoImageSource = lesson.video.directoryName + "/" + lesson.video.fileName.split(".")[0] + ".jpg";


    $scope.addNewTipToLesson = function(newTip){
        newTip.fromAdd = true;
        $scope.addToLesson(newTip);
    }

    $scope.addTipToLibrary = function(newTip,subcategory){
        if (!subcategory){
            alert("You must pick a category and subcategory");
            return;
        }
        newTip.proId = $scope.proId;
        newTip.tip = newTip.text;
        tipLibraryService.createTip(subcategory.subcategoryId, newTip);
        $scope.addNewTipToLesson(newTip);

        $scope.getTips();

    }

    $scope.$watch('category.categoryId', function(category){
        if (category){
            tipLibraryService.getSubcategories($scope.proId, category.categoryId).then(function(subcategories){
                $scope.subcategories = subcategories;
            })
        }
    });


    $scope.addToLesson = function(tip){
        $scope.lesson.lessonText += tip.text + "\n\n";
        if(tip.fromAdd){
            tip.name = "";
            tip.text = "";
        }
    }

    $scope.saveAndNext = function(lesson){
        lessonService.saveAndNext(lesson).then(function(lesson){
            if(lesson){
                $location.url('/giveLesson/'+lesson.lessonId);
            } else {
                alert("All Lessons have been given");
                $location.url('/view1');
            }

        });
    }

}])
/**
 * View all the tips for a pro
 */
.controller('ViewTips', ['$scope', 'tips', function($scope, tips){
        $scope.tips = tips;

        $scope.editTipCategoryName = function(tipCategory){
            $scope.editCat = true;
            $scope.catToEdit = tipCategory;
        }

        $scope.editSubCategoryName = function(tipSubCategory){
            $scope.editSub = true;
            $scope.subToEdit = tipSubCategory;
        }

        $scope.editTipText = function(tip){
            $scope.editTip = true;
            $scope.tipToEdit = tip;
        }
}])
/**
 * View all completed lessons
 */
.controller('CompletedProLessons', ['$scope', 'lessons', '$location', function($scope, lessons, $location){
        $scope.lessons = [];

        angular.forEach(lessons, function(lesson){
            $scope.lessons.push(
                {
                    Id : lesson.lessonId,
                    StudentName : lesson.student.person.firstName + " " + lesson.student.person.lastName,
                    HasBeenRead : lesson.hasBeenRead,
                    RequestedDate : lesson.requestedDate,
                    CompletedDate : lesson.completedDate,
                    Tournament : lesson.tournament.tournamentName
                });
        });



        $scope.selectedItem = [];

            $scope.gridOptions = {
            data : 'lessons',
            selectedItems : $scope.selectedItem,
            afterSelectionChange : function(index, coupon){
                $location.url('/viewLesson/'+$scope.selectedItem[0].Id);
            },
            showFooter: true,
            columnDefs :[
                {field : "StudentName", displayName : 'Student Name', width:200},
                {field : "HasBeenRead", displayName : 'Read', width:100},
                {field : "RequestedDate", displayName : 'Requested Date', cellFilter : 'date:shortDate', width:200},
                {field : "CompletedDate", displayName : 'Completed Date', cellFilter : 'date:shortDate', width:200},
                {field : "Tournament",  width:300}]
        };


}])
/**
 * View all pending lessons
 */
.controller('PendingProLessons', ['$scope', 'lessons', '$location', function($scope, lessons, $location){
        $scope.lessons = [];

        angular.forEach(lessons, function(lesson){
            $scope.lessons.push(
                {
                    Id : lesson.lessonId,
                    StudentName : lesson.student.person.firstName + " " + lesson.student.person.lastName,
                    RequestedDate : lesson.requestedDate,
                    Tournament : lesson.tournament.tournamentName
                });
        });



        $scope.selectedItem = [];

        $scope.gridOptions = {
            data : 'lessons',
            selectedItems : $scope.selectedItem,
            afterSelectionChange : function(index, coupon){
                $location.url('/giveLesson/'+$scope.selectedItem[0].Id);
            },
            showFooter: true,
            columnDefs :[
                {field : "StudentName", displayName : 'Student Name', width:200},
                {field : "RequestedDate", displayName : 'Requested Date', cellFilter : 'date:shortDate', width:250},
                {field : "Tournament",  width:300}]
        };

}]);
