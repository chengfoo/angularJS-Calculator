
(function () {
    angular.module('ourpretendcompany', [
        'ui.router',                    // Routing
        
       
   ])
   .directive("numberInput", function(){
	   "use strict";
	   return {
	       restrict: "A",
	       require: "?pattern",
	       scope: {},
	       replace: false,
	       link: function(scope, element, attrs, ctrl){
	         element.bind('keypress', function (event) {
	           var regex = new RegExp(attrs.pattern);
	           var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	           if (!regex.test(this.value + key)) 
	           {
	        	   	switch(key)
	           		{
	           			case '+':
						case '-':
						case '*':
						case '/':
						case '^':
						case '√':
							scope.$parent.$evalAsync(function() {scope.$parent.onOpClick(key)});
						break;
			
	           		}
	        	   
	        	   	if(event.charCode == 13) // ENTER
	        		{
	        	   		scope.$parent.$evalAsync(function() {scope.$parent.onEnterClick()});
	        		}
	        	   	event.preventDefault();
	        	   	return false;
	             
	           }
	         });
	       }
	   };
   });
})();

