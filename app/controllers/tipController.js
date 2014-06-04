'use strict';

app.controller('CreateTip', function($scope, tipLibraryService){
    tipLibraryService.getCategories(3).then(function(categories){
        $scope.categories = categories;
    });

    $scope.createTipCategory = function(tipCategory){
        tipCategory.proId = 3;
        tipLibraryService.createTipCategory(tipCategory);
    }

    $scope.createTipSubcategory = function(subcategory, category){
        if(!category){
            alert("You must pick a tip category");
            return;
        }
        subcategory.proId = 3;
        tipLibraryService.createTipSubcategory(subcategory, category.categoryId);
    }

    $scope.createTip = function(subcategory, tip){
        if(!subcategory){
            alert("You must pick a sub category");
            return;
        }
        tip.proId = 3;
        tipLibraryService.createTip(subcategory.subcategoryId, tip);
    }

    $scope.$watch('category.categoryId', function(category){
        if (category){
            tipLibraryService.getSubcategories(3, category.categoryId).then(function(subcategories){
                $scope.subcategories = subcategories;
            })
        }
    });

    $scope.$watch('subcategory.subcategoryId', function(subcategory){
        if(subcategory){
            tipLibraryService.getTips(3, subcategory.subcategoryId).then(function(tips){
                $scope.tips = tips;
            })
        }
    })
});
