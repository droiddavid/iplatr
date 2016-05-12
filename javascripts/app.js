/*global angular, $, console */
/*jslint plusplus: true */

var iplatr = angular.module('iplatr', ['ui.router', 'ngRoute', 'angularCSS']);

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
					'partial-cook-menus@cook': {
						templateUrl: 'views/partials/cook_partials/partial-cook-menus.html',
						controller: 'CookPartialMenusController'
					}
				}
			})

			//HOME STATES AND NESTED VIEWS ========================================
			.state('home', {
				url: '/home',
				templateUrl: 'views/partials/partial-home.html'
			})

			//nested list with custom controller
			.state('home.list', {
				url: '/list',
				templateUrl: 'views/partials/partial-home-list.html',
				css: 'stylesheets/master.css',
				controller: function ($scope) {
					$scope.dogs = ['George', 'Leo', 'Spike', 'Hector'];
				} //home.list
			})

			//nested list with just some random string data
			.state('home.paragraph', {
				url: '/paragraph',
				//templateUrl: 'views/partials/partial-home-paragraph.html'
				template: 'I could sure use a drink right now.'
			})

			//about states
			.state('about', {
				url: '/about',
				views: {
					// the main template will be placed here (relatively names)
					'' : { templateUrl: 'views/partials/partial-about.html'},

					// the child views will be defined here (absolutely named)
					'columnOne@about': { template: 'Look I am a column!' },

					// for column two, we'll define a separate controller
					'columnTwo@about': {
						templateUrl: 'views/partials/partial-table.html',
						controller: 'scotchController'
					}
				}
			});
	}
	
]);





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
iplatr.controller(
	'CookPartialMenusController',
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






iplatr.controller('scotchController', function ($scope) {
	'use strict';

	$scope.message = 'test';

	$scope.scotches = [
		{
			name: 'Macallan 12',
			price: 50
		},
		{
			name: 'Chivas Regal Royal Salute',
			price: 10000
		},
		{
			name: 'Glenfiddich 1937',
			price: 20000
		}
	];
});
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
		'MenusFactory',
		[
			'$http', '$log',
			function ($http, $log) {
				'use strict';

				var urlMenuBase = 'http://localhost/iplatr/database/addMenuTitle.php',
					Menus = {
						MENU_ACTIVE : 1,
						MENU_INACTIVE : 0
					};

				Menus.addMenuTitle = function (menu) {
					return $http.post(urlMenuBase, menu);
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
