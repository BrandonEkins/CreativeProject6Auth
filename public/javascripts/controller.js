var app = angular.module("authApp", ["firebase", "ngCookies"]);
app.controller("authController", function($scope, $firebaseAuth, $cookies, $cookieStore) {
    var auth = $firebaseAuth();
    //pulls cookies
    if ($cookies.get('user') != undefined)
        $scope.user = JSON.parse($cookies.get('user'));
    if ($cookies.get('card') != undefined)
        $scope.card = JSON.parse($cookies.get('card'));
    else
        $scope.card = {
            greeting: "",
            text: "",
            pic: ""
        }
    $scope.SignIn = function() {
        auth.$signInWithPopup("google").then(function(user) { // login with google

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

    $scope.createCard = function() {
        $cookies.put('card', JSON.stringify($scope.card));
        $window.location('showCard.html');
    }
});