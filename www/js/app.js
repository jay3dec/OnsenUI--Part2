(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope) {
    var firebaseRef = new Firebase('https://burning-fire-1723.firebaseio.com');

var auth = new FirebaseSimpleLogin(firebaseRef, function(error, user) {
    if (!error) {
        if (user) {
            $scope.username = user.email;
            myNavigator.pushPage('home.html', {
                animation: 'slide'
            });
        }
    }
});

    $scope.data = [];
    $scope.SignIn = function() {
    
    var user = $scope.data.username;
    var pass = $scope.data.password;
    console.log($scope.data);
    if (user && pass) {
        auth.login('password', {
            email: user,
            password: pass
        });
    } else {
        modal.show();
    }
}

$scope.logout = function() {
    auth.logout();         // logging out the firebase
    $scope.data = [];      // clearing user data
    myNavigator.popPage(); // redirecting to sign in page
}

$scope.reg = [];
$scope.SignUp = function() {
    var email = $scope.reg.email;
    var password = $scope.reg.pass;
    if (email && password) {
        auth.createUser(email, password, function(error, user) {
            if (!error) {
                myNavigator.popPage();
            } else {
                alert('error');
            }
        });
    } else {
        modal.show();   // to show validation pop up message
    }
}
  });
  
})();

