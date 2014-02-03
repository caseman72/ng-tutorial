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

	// next/prev buttons ...
	ng.element(function() {
		var re_post = /\/([0-9]{2,})\/$/;
		var path = "{0}".format(window.location.href).split(/[?#]/)[0]
		var parts = re_post.exec(path);
		if (parts) {
			var current = parseInt(parts.pop(), 10);
			var $prev = ng.element("a[href='#prev']");
			if  (current <= 1) {
				$prev.addClass("disabled");
			}
			else {
				var prev = "0{0}".format(current-1).slice(-2);
				$prev.attr("href", path.replace(re_post, "/{0}/".format(prev)));
			}

			var $next = ng.element("a[href='#next']");
			if (current >= ng.site.posts) {
				$next.addClass("disabled");
			}
			else {
				var next = "0{0}".format(current+1).slice(-2);
				$next.attr("href", path.replace(re_post, "/{0}/".format(next)));
			}
		}
	});
})(window.angular);
