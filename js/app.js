(function(ng) {
	// tutorial 4
	ng.
		module("ex4-app", []).
		controller("ex4-controller", ["$scope", "$http", "$timeout",
			function($scope, $http, $timeout) {
				$scope.seahawks = ["loading"];
				$http.
					get("{prefix}/ajax/seahawks.json".format({prefix: ng.site.prefix})).
					then(function(response) {
						$timeout(function() {
							$scope.seahawks = response.data || ["error"];
						}, 1000, true);
					});
			}
		]);

	// tutorial 5
	ng.
		module("ex5-app", []).
		factory("ex5-interceptor", ["$q", function($q) {
			return {
				// optional method
				response: function(response) {
					response.data = ng.element.map(response.data, function(val) {
						return ng.isString(val) ? val.toUpperCase() : val;
					});
					// do something on success
					return response || $q.when(response);
				}
			};
		}]).
		config(["$httpProvider", function($httpProvider) {
			$httpProvider.interceptors.push("ex5-interceptor");
		}]).
		controller("ex5-controller", ["$scope", "$http", "$timeout",
			function($scope, $http, $timeout) {
				$scope.seahawks = ["loading"];
				$http.
					get("{prefix}/ajax/seahawks.json".format({prefix: ng.site.prefix})).
					success(function(data) {
						$timeout(function() {
							$scope.seahawks = data || ["error"];
						}, 1000, true);
					});
			}
		]);
})(window.angular);
