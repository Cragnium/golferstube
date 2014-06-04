'use strict';

app.controller('AccountController', function($scope, userService, userId){

    $scope.user = userService.getUser(userId);
    $scope.user.then(
        function(user){
            //check user type and such
        },
        function(response){
            //do error stuff
        }
    );

});

app.controller('LoginController', function($scope, $modal, $log){
        var modalInstance = $modal.open({
            templateUrl: 'web/app/partials/loginModal.html',
            controller: ModalInstanceCtrl,
            resolve: {

            }
        });

        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
});


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function (usersService, $scope, $modalInstance, $location, $log, $rootScope) {
    $scope.alerts = [];

    $scope.addAlert = function() {
        $scope.alerts.push({type: 'danger', msg: "Invalid User or password"});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.login = function (user) {
        usersService.login(user).then(function(response){
            if( response.success) {

                usersService.getUser(response.userId).then(function(user){
                    $rootScope.user = user;
                });

                $modalInstance.close();
                $location.url(response.targetUrl)
            }
            else if(!response.success){
                $scope.addAlert();
            }
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
        $location.url('/view1');

    };

    $scope.forgotPassword = function() {
        $modalInstance.close();
        $location.url('/view1')
    };
};


app.controller('EditAccountController', function($scope, userService){
    $scope.user = {};

    $scope.insertUser = function(user, form){
        if(form.$valid){
            userService.save(user)
                .then(
                function(response){},
                function(response){}
            )
        }
    }

    $scope.cancelEdit = function(){
        window.location("/EditUser.htlm");
    }
});

app.controller('CreateAccountController', function($scope, usersService, stateService, genderService, countryService){
    $scope.user = {};
    stateService.getStates().then(function(states){
        $scope.states = states;
    });

    genderService.getGenders().then(function(genders){
        $scope.genders = genders;
    });

    countryService.getCountries().then(function(countries){
        $scope.countries = countries;
    });

    $scope.insertUser = function(user){
        usersService.insertUser(user);
    }

});

app.controller('EditAccountController', function($scope, usersService, stateService, genderService, countryService){
    stateService.getStates().then(function(states){
        $scope.states = states;
    });

    genderService.getGenders().then(function(genders){
        $scope.genders = genders;
    });

    countryService.getCountries().then(function(countries){
        $scope.countries = countries;
    });

    /*
     usersService.getUser(1).then(function(user){
     $scope.user = user;
     })
     */
});


