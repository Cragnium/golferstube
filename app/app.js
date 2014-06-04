'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('golferstubeApp', [
    'ui.bootstrap',
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngGrid',
    'golfersTube.admin',
    'golfersTube.main',
    'golfersTube.pros',
    'golfersTube.shared',
    'golfersTube.users'
],
 function($httpProvider)
    {
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $httpProvider.defaults.withCredentials = true;

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data)
        {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj)
            {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for(name in obj)
                {
                    value = obj[name];

                    if(value instanceof Array)
                    {
                        for(i=0; i<value.length; ++i)
                        {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if(value instanceof Object)
                    {
                        for(subName in value)
                        {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if(value !== undefined && value !== null)
                    {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];}

);

app.run(function($cookies, $rootScope, usersService){
    if ($cookies.userId){
        usersService.getUser($cookies.userId).then(function(user){
            $rootScope.user = user;
        })
    }
});

app.config(function($routeProvider){
    $routeProvider
        .when('/createAccount',
        {
            controller: 'CreateAccountController',
            templateUrl: 'web/app/modules/users/partials/createUser.html',
            resolve : {
                states : function(stateService){
                    return stateService.getStates();
                },
                genders : function(genderService){
                    return genderService.getGenders();
                },
                countries : function(countryService){
                    return countryService.getCountries();
                }
            }
        })
        .when('/editAccount',
        {
            controller: 'EditAccountController',
            templateUrl: 'web/app/modules/users/partials/editUser.html',
            resolve : {
                states : function(stateService){
                    return stateService.getStates();
                },
                genders : function(genderService){
                    return genderService.getGenders();
                },
                countries : function(countryService){
                    return countryService.getCountries();
                }
            }
        })
        .when('/createPro',
        {
            controller: 'CreateProController',
            templateUrl: 'web/app/modules/admin/partials/createPro.html',
            resolve : {
                states : function(stateService){
                    return stateService.getStates();
                },
                genders : function(genderService){
                    return genderService.getGenders();
                },
                countries : function(countryService){
                    return countryService.getCountries();
                },
                courses : function(courseService){
                    return courseService.getCourses();
                }
            }
        })
        .when('/createCourse',
        {
            controller: 'CreateCourseController',
            templateUrl: 'web/app/modules/admin/partials/createCourse.html',
            resolve : {
                states : function(stateService){
                    return stateService.getStates();
                }
            }
        })
        .when('/viewCourses',
        {
            controller: 'ViewCoursesController',
            resolve:{
                courses : function(courseService){
                    return courseService.getCourses();
                }
            },
            templateUrl: 'web/app/modules/admin/partials/viewCourses.html'
        })
        .when('/viewPros',
        {
            controller:'ViewProsController',
            templateUrl: 'web/app/modules/admin/partials/viewPros.html',
            resolve : {
                pros : function(proService){
                    return proService.getPros();
                }
            }
        })
        .when('/viewProInfo/:id',
        {
             controller : 'ViewProInfo',
             templateUrl : 'web/app/modules/admin/partials/viewProInfo.html',
             resolve : {
                 pro : function($route, proService){
                     return proService.getPro($route.current.params.id);
                 }
             }
        })
        .when('/createTip',
        {
            controller : 'CreateTip',
            templateUrl : 'web/app/modules/pros/partials/createTip.html',
            resolve : {
               categories : function(tipLibraryService){
                   return tipLibraryService.getCategories();
               }
            }
        })
        .when('/viewTips',
        {
            controller : 'ViewTips',
            templateUrl : 'web/app/modules/pros/partials/viewTips.html',
            resolve : {
                tips : function(tipLibraryService){
                    return tipLibraryService.getTips();
                }
            }
        })
        .when('/createLesson',
        {   controller : 'CreateLesson',
            templateUrl : 'web/app/partials/createLesson.html',
            resolve : {
                tournaments : function(tournamentService){
                    return tournamentService.getTournaments();
                }
            }
        })
        .when('/createTournament',
        {
            controller : 'CreateTournament',
            templateUrl : 'web/app/modules/admin/partials/createTournament.html',
            resolve : {
                courses : function(courseService){
                    return courseService.getCourses();
                }
            }
        })
        .when('/viewTournaments',
        {
            controller : 'ViewTournaments',
            templateUrl : 'web/app/modules/admin/partials/viewTournaments.html'
        })
        .when('/viewPendingLessons',
        {
            controller : 'ViewPendingLessons',
            templateUrl: 'web/app/modules/admin/partials/viewPendingLessons.html',
            resolve : {
                lessons : function(lessonService){
                    return lessonService.getPendingLessons();
                }
            }
        })
        .when('/giveLesson/:id',
        {
            controller : 'GiveLesson',
            templateUrl : 'web/app/modules/pros/partials/giveLesson.html',
            resolve : {
                lesson : function(lessonService, $route){
                    return lessonService.getLesson($route.current.params.id);
                },
                tips : function(tipLibraryService){
                    return tipLibraryService.getTips();
                }
            }
        })
        .when('/viewLesson/:id',
        {
            controller : 'ViewLesson',
            resolve:{
                lesson : function(lessonService, $route){
                    return lessonService.getLesson($route.current.params.id);
                }
            },
            templateUrl : 'web/app/modules/users/partials/viewLesson.html'
        })
        .when('/login',
        {
            controller : 'LoginController',
            templateUrl : 'web/app/modules/shared/partials/login.html'
        })
        .when('/forgotPassword/:status',
        {
             controller : 'ForgotPassword',
             templateUrl : 'web/app/modules/shared/partials/forgotPassword.html'
        })
        .when('/view1',
        {
            controller : 'MainController',
            templateUrl : 'web/app/modules/main/partials/view1.html'
        })
        .when('/proVideos',
        {
            controller : 'ViewProVideos',
            templateUrl : 'web/app/modules/pros/partials/proVideos.html'
        })
        .when('/addProVideo',
        {
            controller : 'AddProVideo',
            templateUrl : 'web/app/modules/pros/partials/addProVideo.html'
        })
        .when('/proCoupons',
        {
            controller : 'ViewProCoupons',
            resolve:{
                coupons : function(proService){
                    return proService.getActiveCoupons();
                }
            },
            templateUrl : 'web/app/modules/pros/partials/proCoupons.html'
        })
        .when('/addNewCoupon',
        {
            controller : 'AddProCoupons',
            templateUrl : 'web/app/modules/pros/partials/addProCoupon.html',
            resolve : {
                courses : function(proService){
                    return proService.getProCourses();
                }
            }
        })
        .when('/rateMySwing',
        {
            controller : 'RateMySwing',
            templateUrl : 'web/app/modules/main/partials/comingSoon.html'
        })
        .when('/uploadVideoInfo',
        {
            controller : 'UploadVideoInfo',
            templateUrl : 'web/app/modules/main/partials/uploadVideoInfo.html'
        })
        .when('/uploadVideo',
        {
            controller : 'UploadVideo',
            templateUrl : 'web/app/modules/main/partials/comingSoon.html',
            resolve : {
                videoTypes : function(videoService){
                    return videoService.getVideoTypes();
                }
            }
        })
        .when('/serviceReservations',
        {
            controller : 'ServiceReservations',
            templateUrl : 'web/app/modules/main/partials/serviceReservations.html'
        })
        .when('/forgotPassword',
        {
            controller : 'ForgotPassword',
            templateUrl : 'web/app/modules/shared/partials/forgotPassword.html'
        })
        .when('/myVideos',
        {
            controller : 'MyVideos',
            templateUrl : 'web/app/modules/users/partials/myVideos.html',
            resolve : {
                userVideos : function(videoService){
                    return videoService.getUserVideos();
                }
            }
        })
        .when('/myVideoDetail/:id',
        {
            controller : 'MyVideoDetail',
            templateUrl : 'web/app/modules/users/partials/myVideoDetail.html',
            resolve : {
                userVideo : function(videoService, $route){
                    return  videoService.getUserVideo($route.current.params.id);
                }
            }
        })
        .when('/myLessons',{
            controller : 'MyLessons',
            resolve:{
                lessons : function(lessonService){
                    return lessonService.getLessonsForStudent();
                }
            },
            templateUrl : 'web/app/modules/users/partials/myLessons.html'
        })
        .when('/tournamentServices', {
            controller : 'TournamentService',
            templateUrl : 'web/app/modules/main/partials/tournamentServices.html'
        })
        .when('/proDashboard', {
            controller : 'ProDashboard',
            templateUrl : 'web/app/modules/pros/partials/dashboard.html',
            resolve : {
                numberOfTips : function(tipLibraryService){
                    return tipLibraryService.getNumberOfTips();
                },
                pro : function(proService){
                    return proService.getCurrentPro();
                },
                numberCompletedLessons : function(lessonService){
                    return lessonService.numberCompletedLessonsForPro();
                },
                numberPendingLessonsForPro : function(lessonService){
                    return lessonService.numberPendingLessonsForPro();
                },
                numberCoupons : function(proService){
                    return proService.getCouponCount();

                }
            }
        })
        .when('/completedLessons/pro', {
            controller : 'CompletedProLessons',
            templateUrl : 'web/app/modules/pros/partials/completedLessons.html',
            resolve : {
                lessons : function(lessonService){
                    return lessonService.getCompletedProLessons();
                }
            }
        })
        .when('/pendingLessons/pro', {
            controller : 'PendingProLessons',
            templateUrl : 'web/app/modules/pros/partials/viewLessons.html',
            resolve : {
                lessons : function(lessonService){
                    return lessonService.getPendingProLessons();
                }
            }
        })
        .when('/userDashboard', {
            controller : 'ViewUserDashboard',
            templateUrl : 'web/app/modules/users/partials/dashboard.html'
        })
        .when('/viewFavorites', {
            controller : 'ViewFavorites',
            templateUrl : 'web/app/modules/users/partials/viewFavorites.html'
        })
        .when('/userTips', {
            controller : 'UserTips',
            templateUrl : 'web/app/modules/users/partials/viewTips.html'
        })
        .when('/userComments', {
            controller : 'UserComments',
            templateUrl : 'web/app/modules/users/partials/viewComments.html'
        })
        .otherwise({ redirectTo: '/view1'});
});
