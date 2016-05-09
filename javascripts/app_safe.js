/*global angular, $ */

var ifas = angular.module('ifas', ['ngRoute']);

ifas.config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
        'use strict';
        
        $routeProvider.when('/', {
            controller: 'IndexController',
            templateUrl: 'views/partials/index.html'

        }).when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/partials/login.html'
        
        }).when('/register', {
            controller: 'RegisterController',
            templateUrl: 'views/partials/register.html'
        
        }).when('/cook', {
            controller: 'CookController',
            templateUrl: 'views/partials/cook.html'
        
        }).when('/foodie', {
            controller: 'FoodieController',
            templateUrl: 'views/partials/foodie.html'
        
        }).otherwise({ redirectTo: '/' });

		$locationProvider.html5Mode({enabled: true, requireBase: false});
    }
    
]);





ifas.controller('CookController', ['$log', '$http', '$scope', 'PersonFactory', function ($log, $http, $scope, PersonFactory) {
    'use strict';
    
    $scope.Person = PersonFactory;
    
    this.init = function () {
        $log.log('I am inside of the Cook Controller.');
        $log.log('$scope.Person.status' + $scope.Person.status);
    }; //init
    
    this.init();
}]);





ifas.controller('IndexController', ['$log', '$http', '$scope', '$location', 'PersonFactory', function ($log, $http, $scope, $location, PersonFactory) {
    'use strict';
    
    //handle css classes for setup and login screen
    $('.form')
        .find('input, textarea')
        .on('keyup blur focus', function (e) {
  
            var $this = $(this),
                label = $this.prev('label');
        
            if (e.type === 'keyup') {
                if ($this.val() === '') {
                    label.removeClass('active highlight');
                } else {
                    label.addClass('active highlight');
                }
            } else if (e.type === 'blur') {
                if ($this.val() === '') {
                    label.removeClass('active highlight');
                } else {
                    label.removeClass('highlight');
                }
            } else if (e.type === 'focus') {
                if ($this.val() === '') {
                    label.removeClass('highlight');
                } else if ($this.val() !== '') {
                    label.addClass('highlight');
                }
            }
        });
    
    $('.tab a').on('click', function (e) {
        var target = null;
        
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);
    });

    $scope.register = function (person) {
        var register_url = 'http://localhost/ifas/database/addNewPerson.php';
        
        $http.post(register_url, person)
            .success(
                function (response) {
                    $scope.status = response.status;
                    $scope.message = response.message;
                    $location.path('/ifas/');
                }
            )
            .error(function (error) {});

    }; //$scope.register

    //Send email and password to php from login form
    $scope.login = function (person) {
        PersonFactory.getPerson(person)
            .success(function (response) {
                //on success, assign response data to the PersonFactory
                PersonFactory.Person = {
                    personId : response.data[0].personId,
                    firstname : response.data[0].firstname,
                    lastname : response.data[0].lastname,
                    accountType : response.data[0].accountType,
                    emailaddress : response.data[0].emailaddress,
                    data : response.data
                };

                //Depending on the accountType, change views.
                if (response.data[0].accountType === 'Cook') {
                    $location.path('/cook');
                } else {
                    $location.path('/foodie');
                }
            });
      
    }; //$scope.login

}]);





ifas
    .factory(
        'PersonFactory',
        [
            '$http',
            function ($http) {
                'use strict';

                var urlBase = 'http://localhost/ifas/database/getUser.php',
                    urlBase_addPerson = 'http://localhost/ifas/database/addPerson.php',
                    urlBase_getMenus = 'http://localhost/ifas/database/getMenus.php',
                    Person = {};

                Person.getPerson = function (person) {
                    return $http.post(urlBase, person);
                };
                
                Person.insertPerson = function (Person) {
                    return $http.post(urlBase, Person);
                };

                Person.updatePerson = function (Person) {
                    return $http.put(urlBase + '/' + Person.ID, Person);
                };

                Person.getMenus = function () {
                    return $http.get(urlBase_getMenus, Person);
                }; //getMenus

                return Person;
            }
        ]
    );






















