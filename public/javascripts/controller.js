var app = angular.module("authApp", ["firebase"]);
app.controller("authController", function($scope, $firebaseAuth) {
    var auth = $firebaseAuth();
    // login with google

    $scope.SignIn = function() {
        auth.$signInWithPopup("google").then(function(user) {
            $scope.user = user;
            console.log("Signed in as:", $scope.user.user.displayName);
        }).catch(function(error) {
            console.log("Authentication failed:", error);
        });
    }
    $scope.SignOut = function() {
        auth.$signOut().then(function() {
            console.log("Signed Out");
            $scope.user = null;
        }, function(error) {
            console.log(error);
        });
    }
});