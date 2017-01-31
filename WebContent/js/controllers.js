
function MainCtrl() {

};

function ContentCtrl($scope, $http) {

};


function CalculatorCtrl($rootScope, $scope) 
{
	$scope.firstNumber = 0;
	$scope.operator = "";
	$scope.display = '0';
	$scope.needReset = false;
	
	$scope.onDelClick = function()
	{
		$scope.display = $scope.display.toString().substring(0, $scope.display.length - 1);
	}
	
	$scope.onNumClick = function(number)
	{
		var expectedValue = "";
		if($scope.needReset)
		{
			$scope.display = number;
			$scope.needReset = false;
		}
		else
		{
			expectedValue = ($scope.display == '0' ? '' : $scope.display).toString() + number;
		}
		
		var regex = new RegExp($rootScope.numberRegex);
		if(!regex.test(expectedValue))
		{
			return -1;
		}
		
		$scope.display = expectedValue;
		return 0;
	}
	
	$scope.onOpClick = function(operator)
	{
		if($rootScope.allowedOperator.indexOf(operator) < 0)
		{
			return -1;
		}
		
		if($scope.operator != '')
		{
			$scope.onEnterClick();
		}

		if($scope.display != '')
		{
			$scope.firstNumber = $scope.display;
		}
		$scope.operator = operator;
		$scope.display = '';
		
		if($scope.operator == '√')
		{
			$scope.display = Math.sqrt(parseFloat($scope.firstNumber));
		}
		
		return 0;
	}
	
	$scope.onEnterClick = function()
	{
		$scope.secondNumber = $scope.display;
		if(isNaN(parseFloat($scope.firstNumber)) || isNaN(parseFloat($scope.secondNumber)) || !$scope.operator)
		{
			return -1;
		}
		
		$scope.needReset = true;
		switch($scope.operator)
		{
		case '+':
			$scope.display = parseFloat($scope.firstNumber) + parseFloat($scope.secondNumber);
			break;
		case '-':
			$scope.display = parseFloat($scope.firstNumber) - parseFloat($scope.secondNumber);
			break;
		case '*':
			$scope.display = parseFloat($scope.firstNumber) * parseFloat($scope.secondNumber);
			break;
		case '/':
			$scope.display = parseFloat($scope.firstNumber) / parseFloat($scope.secondNumber);
			break;
		case '^':
			$scope.display = Math.pow(parseFloat($scope.firstNumber), parseFloat($scope.secondNumber));
			break;
		}
		
		$scope.operator = "";
		$scope.firstNumber = 0;
		$scope.secondNumber = 0;
		
		return 0;
	}
	
	$scope.onClrClick = function()
	{
		$scope.operator = "";
		$scope.firstNumber = 0;
		$scope.secondNumber = 0;
		$scope.display = 0;
		
		return 0;
	}
}

angular
.module('ourpretendcompany')
.controller('MainCtrl', MainCtrl)
.controller('ContentCtrl', [ '$scope', '$http', ContentCtrl])
.controller('CalculatorCtrl', [ '$rootScope', '$scope', CalculatorCtrl ])