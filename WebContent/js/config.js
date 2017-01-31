function config($stateProvider, $urlRouterProvider, $httpProvider) 
{
    $urlRouterProvider.otherwise("index/calculator");

    $stateProvider
	    .state('index', {
	        abstract: true,
	        url: "/index",
	        templateUrl: "views/content.html",
	        controller: 'ContentCtrl'
	    })
	    .state('index.calculator', {
	        url: "/calculator",
	        templateUrl: "views/basicCalculator.html",
	        controller: 'CalculatorCtrl',
	        data: { pageTitle: 'Calculator' }
	    })
	    ;
}
angular
    .module('ourpretendcompany')
    .config(config)
    .run(['$rootScope', 
      function($rootScope) 
	{
		$rootScope.allowedOperator = ['+', '-', '*', '/', '^', '√'];
		$rootScope.numberRegex = '^[0-9]+[.]?[0-9]*$';
	}]);