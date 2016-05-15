/*global angular, $, console */
/*jslint plusplus: true */

var iplatr = angular.module('iplatr', ['ui.router', 'ngRoute', 'angularCSS', 'ngAnimate', 'ui.bootstrap']);

iplatr.run(function ($rootScope) {
	'use strict';
	$rootScope.$on("$stateChangeError", console.log.bind(console));
});


iplatr.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider) {
		'use strict';

		$locationProvider.html5Mode({enabled: true, requireBase: false});
		$urlRouterProvider.otherwise("views/partials/partial-index.html");

		$stateProvider
			.state('index', {
				url: '/',
				controller: 'IndexController',
				abstract: true
			})



			//INDEX STATE ==========================================================
			.state('/', {
				url: '/',
				templateUrl: 'views/partials/partial-index.html',
				controller: 'IndexController',
				css: 'stylesheets/master.css'
			})
			.state('login', {
				url: '/',
				templateUrl: 'views/partials/partial-index.html',
				controller: 'IndexController',
				css: 'stylesheets/master.css'
			})



			//COOK STATE ==========================================================
			.state('cook', {
				url: '/cook',
				views: {
					'': {
						templateUrl: 'views/partials/cook_partials/partial-cook.html',
						controller: 'CookController',
						css: 'stylesheets/master.css'
					},
					'partial-cook-header@cook': {
						templateUrl: 'views/partials/cook_partials/partial-cook-header.html',
						controller: 'CookPartialHeaderController'
					},
					'partial-cook-person@cook': {
						templateUrl: 'views/partials/cook_partials/partial-cook-person.html',
						controller: 'CookPartialPersonController'
					},
					'partial-cook-menus-add@cook': {
						templateUrl: 'views/partials/cook_partials/partial-cook-menus-add.html',
						controller: 'CookPartialMenusAddController'
					},
					'partial-cook-menus-list@cook': {
						templateUrl: 'views/partials/cook_partials/partial-cook-menus-list.html',
						controller: 'CookPartialMenusListController'
					}
				}
			});
	}
	
]);




//Cook Partial Header
iplatr.controller(
	'CookPartialHeaderController',
	[
		'$log', '$http', '$scope', 'PersonFactory',
		function ($log, $http, $scope, PersonFactory) {
			'use strict';
			$log.log('Inside of the CookPartialHeaderController.');
		}
	]
);
//Cook Partial Person
iplatr.controller(
	'CookPartialPersonController',
	[
		'$log', '$http', '$scope', 'PersonFactory',
		function ($log, $http, $scope, PersonFactory) {
			'use strict';
			$log.log('Inside of the CookPartialPersonController.');
		}
	]
);
//Cook Partial Menus Add
iplatr.controller(
	'CookPartialMenusAddController',
	[
		'$log', '$http', '$scope', 'PersonFactory', 'MenusFactory',
		function ($log, $http, $scope, PersonFactory, MenusFactory) {
			'use strict';

			$scope.addNewMenuTitle = function (menu) {
				this.menuArgs = {
					menuTitle: menu.menuTitle,
					dateCreated: new Date(),
					status: MenusFactory.MENU_ACTIVE,
					personId: PersonFactory.Person.personId
				};

				//Get the menus for this cook.
				MenusFactory.addMenuTitle(this.menuArgs)
					.success(
						function (response) {
							$scope.status = response.status;
							$scope.message = response.message;
						}
					)
					.error(
						function (err) {
							$log.log('Error occured: ' + err.message);
						}
					);
			}; //addMenuTitle

		} //end function CookPartialMenusController
	]
);
//Cook Partial Menus List Controller
iplatr.controller(
	'CookPartialMenusListController',
	[
		'$log', '$http', '$scope', 'PersonFactory', 'MenusFactory', 'PlatterFactory',
		function ($log, $http, $scope, PersonFactory, MenusFactory, PlatterFactory) {
			'use strict';

			$scope.Menus = [];			//Used for holding the menu titles.
			$scope.Platters = [];		//Used for holding a menu's platters.
			$scope.oneAtATime = true;	//Used for managing the collapsable list.
			$scope.status = {
				isFirstOpen: true,
				isFirstDisabled: false
			};

			//Get the menu titles then populates the $scope.Menus array.
			$scope.getMenuTitles = function (personId) {
				MenusFactory.getMenuTitles({ personId: personId})
					.success(
						function (response) {
							$scope.Menus = response.data;
							$scope.status = response.status;
							$scope.message = response.message;
						}
					)
					.error(
						function (err) {
							$log.log('Error: ' + err.message);
						}
					);
			}; //$scope.getMenuTitles

			//For each menu in the Menus array, get the associated platter.
			$scope.getPlatter = function (menu) {
				$scope.Platters.length = 0;

				this.menuArgs = {
					menuId : menu.menuId,
					personId : PersonFactory.Person.personId
				};
				
				//Get a platter based on a menuId
				PlatterFactory.getPlatter(this.menuArgs)
					.success(
						function (response) {
							$scope.status = response.status;
							$scope.message = response.message;
							$scope.Platters = response.data;
						}
					)
					.error(
						function (err) {
							$log.log('Error occured: ' + err.message);
						}
					);
			}; //getPlatter

			$scope.getMenuTitles(PersonFactory.Person.personId);
		} //end function CookPartialMenusListController
	]
);
//Cook Partial Platter
iplatr.controller(
	'CookPartialPlatterController',
	[
		'$log', '$http', '$scope', 'PersonFactory',
		function ($log, $http, $scope, PersonFactory) {
			'use strict';
			$log.log('Inside of the CookPartialPlatterController.');
		}
	]
);
//Cook Partial PlatterItems
iplatr.controller(
	'CookPartialPlatterItemsController',
	[
		'$log', '$http', '$scope', 'PersonFactory',
		function ($log, $http, $scope, PersonFactory) {
			'use strict';
			$log.log('Inside of the CookPartialPlatterItemsController.');
		}
	]
);
//Cook Partial Footer
iplatr.controller(
	'CookPartialFooterController',
	[
		'$log', '$http', '$scope', 'PersonFactory',
		function ($log, $http, $scope, PersonFactory) {
			'use strict';
			$log.log('Inside of the CookPartialFooterController.');
		}
	]
);







iplatr.controller('CookController', ['$log', '$http', '$scope', 'PersonFactory', function ($log, $http, $scope, PersonFactory) {
	'use strict';
	
	$scope.Person = PersonFactory.Person;
	$scope.Menus = [];
	$scope.Platters = [];
	
	this.init = function () {
		$log.log('Inside of the CookController.');
		
		//Get the menus for this cook.
		PersonFactory.getMenus($scope.Person.personId)
			.success(
				function (response) {
					var index = 0;
					if (response && response.status !== 'warning') {
						$scope.Menus = response.data;
						
						if ($scope.Menus !== undefined) {
							while (index < $scope.Menus.length) {
								$log.log('$scope.Menus[' + index + '].title: ' + $scope.Menus[index].title);
								index = index + 1;
							}
						}
					}
				}
			)
			.error(
				function (err) {
					$log.log('Error occured: ' + err.message);
				}
			);
		
		//Get the platters for this cook.
		PersonFactory.getPlatters($scope.Person.personId)
			.success(
				function (response) {
					var index = 0;
					
					if (response && response.status !== 'warning') {
						$scope.Platters = response.data;

						if ($scope.Platters !== undefined) {
							while (index < $scope.Person.length) {
								$log.log(
									'$scope.Platters[' + index + '].name: ' +
										$scope.Platters[index].name + ', ' +
										'$scope.Platters[' + index + '].price: ' +
										$scope.Platters[index].price
								);
								index = index + 1;
							}
						}
					}
				}
			)
			.error(
				function (err) {
					$log.log('Error occured: ' + err.message);
				}
			);

	}; //init
	
	//this.init();
	
}]);
iplatr.controller('IndexController', ['$log', '$http', '$scope', '$location', 'PersonFactory', '$state', function ($log, $http, $scope, $location, PersonFactory, $state) {
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
		var register_url = 'http://localhost/iplatr/database/addNewPerson.php';
		
		$http.post(register_url, person)
			.success(
				function (response) {
					$scope.status = response.status;
					$scope.message = response.message;
					$state.go('login');
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

iplatr
	.factory(
		'PlatterFactory',
		[
			'$http', '$log',
			function ($http, $log) {
				'use strict';

				var urlPlatterBase = 'http://localhost/iplatr/database/',
					getPlatter = 'getPlatter.php',
					Platter = {};

				//menu object needed for menuId property
				Platter.getPlatter = function (menu) {
					return $http.post(urlPlatterBase + getPlatter, menu);
				};

				return Platter;
			}
		]
	);

iplatr
	.factory(
		'MenusFactory',
		[
			'$http', '$log',
			function ($http, $log) {
				'use strict';

				var urlMenuBase = 'http://localhost/iplatr/database/',
					addMenuTitle = 'addMenuTitle.php',
					getMenuTitles = 'getMenus.php',
					Menus = {
						MENU_ACTIVE : 1,
						MENU_INACTIVE : 0,
						Menus : []
					};

				Menus.addMenuTitle = function (menu) {
					return $http.post(urlMenuBase + addMenuTitle, menu);
				};

				Menus.getMenuTitles = function (personId) {
					return $http.post(urlMenuBase + getMenuTitles, personId);
				};

				return Menus;

			} //end function
		]
	);


iplatr
	.factory(
		'PersonFactory',
		[
			'$http', '$log',
			function ($http, $log) {
				'use strict';

				var urlBase = 'http://localhost/iplatr/database/getUser.php',
					urlBase_addPerson = 'http://localhost/iplatr/database/addPerson.php',
					urlBase_getMenus = 'http://localhost/iplatr/database/getMenus.php',
					urlBase_getPlatters = 'http://localhost/iplatr/database/getPlatters.php',
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

				Person.getMenus = function (id) {
					return $http.post(urlBase_getMenus, {personId : id});
				}; //getMenus
				
				Person.getPlatters = function (personId) {
					$log.log('Inside Person.getPlatters');
					$log.log('menuId: ' + personId);
					return $http.post(urlBase_getPlatters, {personId : personId});
				}; //getPlatters

				return Person;
			}
		]
	);
