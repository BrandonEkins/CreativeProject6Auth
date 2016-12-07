var app = angular.module("authApp", ["firebase", "ngCookies"]);
app.controller("authController", function($scope, $firebaseAuth, $cookies, $cookieStore) {
    var auth = $firebaseAuth();
    // login with google

    $scope.user = JSON.parse($cookies.get('user'));

    $scope.SignIn = function() {
        auth.$signInWithPopup("google").then(function(user) {

            $scope.user = user;
            console.log("Signed in as:", $scope.user.user.displayName);
            $cookies.put('user', JSON.stringify($scope.user));
        }).catch(function(error) {
            console.log("Authentication failed:", error);
        });
    }
    $scope.SignOut = function() {
        auth.$signOut().then(function() {
            console.log("Signed Out");
            $scope.user = null;
            $cookies.remove('user');
        }, function(error) {
            console.log(error);
        });
    }
});