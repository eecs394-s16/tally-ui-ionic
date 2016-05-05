angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

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
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

.controller('PlaylistsCtrl', function($scope, $ionicModal, $timeout, $http, ItemService) {

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
        for(i=0;i< $scope.items.length;i++){
          ItemService.addItem($scope.items[i]);
        }
      } 
    );
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
})

.controller('ItemCtrl', function($scope, $stateParams, $ionicModal, ItemService) {
  $scope.itemId = $stateParams.itemId;
  $scope.itemDetails = ItemService.getItem($scope.itemId);
  $ionicModal.fromTemplateUrl('templates/edit-item.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editModal = modal;
  });

  $scope.hideEdit = function() {
    $scope.editModal.hide();
  };

  $scope.showEdit = function() {
    $scope.editModal.show();
  };
  $scope.editItem = function() {

  }
})

.service('ItemService', function() {
 return {
   // Object fields 
   // attribution (unclear what this is)
   // board (object with internal fields)
   //    id
   //    name
   //    url
   // created_at
   // creator 
   //    first_name
   //    id
   //    last_name:
   //    url
   // id
   // image
   //    original
   //       height
   //       url
   //       width
   // link (if pin links to external site)
   // note (description I think)
   // url (url to pin)
   items: {},
   getItems: function() {
    // console.log(this.items);
         return this.items;
   },
   getItem: function(itemId) {
     // for(i=0;i<this.items.length;i++){
     //   if(this.items[i].id == itemId){
     //     // window.alert(this.items[i]);
     //     return this.items[i];
     //   }
     // }
     return this.items[itemId];
   },
   addItem: function(item) {
    // this.items.push(item);
    this.items[item.id] = item;
    console.log("adding");
    console.log(this.items[item.id]);
   }
 }
})
;

