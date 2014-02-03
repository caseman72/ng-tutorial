"use strict";
/* /js/app.js */
(function(ng) {
	var ex4_app = ng.module("ex4-app", []);
	ex4_app.controller("ex4-controller", ["$scope", "$http", "$timeout",
		function($scope, $http, $timeout) {
			$scope.seahawks = ["loading"];
			$http.
				get("/ajax/seahawks.json").
				then(function(response) {
					$timeout(function() {
						$scope.seahawks = response.data || ["error"];
					}, 1000, true);
				});
		}
	]);
})(window.angular);
