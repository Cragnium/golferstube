'use strict';

app.controller('CreateLesson', function($scope, lessonService, tournamentService){
    tournamentService.getTournaments().then(function(tournaments){
       $scope.tournaments = tournaments;
    });

    $scope.createLesson =  function(lesson){
        lessonService.createLesson(lesson);
    }

});

app.controller('ViewPendingLessons', function($scope, lessonService){
    lessonService.getPendingLessons().then(function(lessons){
        $scope.lessons = lessons;
    });

    $scope.getProName = function(lesson){
        if (lesson.pro){
            return lesson.pro.firstName + " " + lesson.pro.lastName;
        } else {
            return "Unassigned";
        }
    }
});

app.controller('ViewPendingStudentLessons', function($scope, lessonService){
    lessonService.getPendingStudentLessons().then(function(lessons){
        $scope.lessons = lessons;
    });
    //TODO not sure if I should keep this as getProName and return the pro name or if we are looking for student name here KB.
    $scope.getProName = function(lesson){
        if (lesson.student){
            return lesson.pro.firstName + " " + lesson.pro.lastName;
        } else {
            return "Unassigned";
        }
    }
});

app.controller('ViewLesson', function($scope, lessonService, $routeParams, $location){
    $scope.id = $routeParams.id;


    lessonService.getLesson($scope.id).then(function(lesson){
        $scope.lesson = lesson;
    });
});

app.controller('GiveLesson', function($scope, lessonService, tipLibraryService, $routeParams, $location){
    $scope.id = $routeParams.id;


    lessonService.getLesson($scope.id).then(function(lesson){
        lesson.lessonText = "";
        $scope.lesson = lesson;
        $scope.proId = lesson.pro.proId;
        $scope.getTips();
    });

    $scope.getTips = function(){
        tipLibraryService.getTips($scope.proId).then(function(categories){
            $scope.categories = categories;
        });
    }


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

});