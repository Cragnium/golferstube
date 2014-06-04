'user strict'

angular.module('golfersTube.shared.controllers', [])

/**
 * Upload a video
  */
.controller('UploadVideo', ['$scope', 'videoService', 'videoTypes', function($scope, videoService, videoTypes){
    $scope.videoTypes = videoTypes;

    $scope.uploadVideo = function(video){
        videoService.uploadVideo(video);
    };
}])

/**
 * Login controller
 */
.controller('LoginController', ['$scope', '$modal', '$log', function($scope, $modal, $log){
    var modalInstance = $modal.open({
        templateUrl: 'web/app/modules/shared/partials/loginModal.html',
        controller: ModalInstanceCtrl,
        resolve: {

        }
    });

    modalInstance.result.then(function () {
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
}])
/**
 * Forgot password controller
 */
.controller('ForgotPassword', ['$scope', 'usersService', '$routeParams', '$location', function($scope, usersService, $routeParams, $location){
    $scope.status = $routeParams.status;
    $scope.forgotPassword =  function(email){
        usersService.forgotPassword(email);
    };
    $scope.alerts = [];
    if ($scope.status === "true"){
        $scope.alerts.push(
            {
                type: 'success',
                msg: 'Your password has been sent to your email address.'
            }
        )
    }else if ($scope.status === "false"){
        $scope.alerts.push(
            {
                type: 'danger',
                msg: 'Your email was not found.  Please enter the email you used to create your account or create a new account.'
            }
        )
    }
    $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
    };

    $scope.createAccount = function() {
        $location.url('/createAccount');
    }
}]);



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

    $scope.login = function (user, $cookies) {
        usersService.login(user).then(function(response){
            if( response.success) {

                usersService.getUser(response.userId).then(function(user){
                    //set the user in the root scope
                    $rootScope.user = user;
/*
                    //create a cookie so the user persists when the app is reloaded
                    $cookies.userType = user.userType.code;
                    $cookies.userId = user.userId;


*/
                    if ($rootScope.user.userType.code == "PRO"){
                        $location.url("/proDashboard");
                    } else {
                        $location.url(response.targetUrl)
                    }


                });

                $modalInstance.close();

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
        $location.url('/forgotPassword')
    };

    $scope.createAccount = function() {
        $modalInstance.close();
        $location.url('/createAccount');
    }
};


