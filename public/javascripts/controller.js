var app = angular.module("authApp", ["firebase", "ngCookies"]);
app.controller("authController", function($scope, $firebaseAuth, $cookies, $cookieStore, $window) {
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
            var landingUrl = "http://" + $window.location.host + "/createCard.html";
            $window.location.href = landingUrl;
        }).catch(function(error) {
            console.log("Authentication failed:", error);
        });
    }
    $scope.SignOut = function() {
        auth.$signOut().then(function() {
            console.log("Signed Out");
            $scope.user = null;
            $cookies.remove('user');
            $cookies.remove('card');
            var landingUrl = "http://" + $window.location.host + "/login.html";
            $window.location.href = landingUrl;
        }, function(error) {
            console.log(error);
        });
    }

    $scope.createCard = function() {

        $cookies.put('card', JSON.stringify($scope.card));
        var landingUrl = "http://" + $window.location.host + "/showCard.html";
        $window.location.href = landingUrl;
    }
    $scope.farewell = [
        "May your heart be warmed over a christmas fire this season just like chestnuts,",
        "May the bells of Christmas always ring in your soul,",
        "May you always have company this holiday season with kittens purring at your feet,",
        "Best wishes Christmas fishes,",
        "May you find true love under the mistletoe this season,",
        "May the mistletoe steal your heart away,",
        "From a mean one, \n Mr. Grinch. \n aka, "
    ];
});