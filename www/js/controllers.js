angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  PDK.init({appId:'4833595787237665566', cookie: true});

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(callback) {
    console.log('Doing login', $scope.loginData);

    PDK.login({scope : 'read_public, write_public'}, callback);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})



.controller('PlaylistsCtrl', function($scope, $ionicModal, $timeout, $http) {

  $scope.importData = {}

  $ionicModal.fromTemplateUrl('templates/import.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.importModal = modal;
  });

  $scope.closeImport = function() {
    $scope.importModal.hide();
  };

  // Open the login modal
  $scope.import = function() {
    $scope.importModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doImport = function() {
    console.log('Doing Import', $scope.importData);
    $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=Ac5HCX-jeHtTBqSZE87_3Hy7xmATFEs87BUzGXtDEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
      console.log(response.data.data);
      $scope.items = response.data.data;
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeImport();
    }, 1000);
  };

  // console.log($scope.importData)

  
  // $scope.playlists = [
  //   { title: 'Reggae', id: 1 },
  //   { title: 'Chill', id: 2 },
  //   { title: 'Dubstep', id: 3 },
  //   { title: 'Indie', id: 4 },
  //   { title: 'Rap', id: 5 },
  //   { title: 'Cowbell', id: 6 }
  // ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

