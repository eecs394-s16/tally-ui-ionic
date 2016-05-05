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

// .controller('CollectionCtrl', function($scope, $http) {
//   $http.get("https://api.pinterest.com/v1/boards/amyilyse/interiors/pins/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution").then(function(response){
//     console.log(response.data.data);
//     $scope.items = response.data.data;
//   });
//   // $scope.playlists = [
//   //   { title: 'Reggae', id: 1 },
//   //   { title: 'Chill', id: 2 },
//   //   { title: 'Dubstep', id: 3 },
//   //   { title: 'Indie', id: 4 },
//   //   { title: 'Rap', id: 5 },
//   //   { title: 'Cowbell', id: 6 }
//   // ];
// })

// .controller('PlaylistsCtrl', function($scope, $http) {
//   $http.get("https://api.pinterest.com/v1/boards/amyilyse/interiors/pins/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution").then(function(response){
//     console.log(response.data.data);
//     $scope.items = response.data.data;
//   });

//   $scope.closeImport = function() {
//     $scope.importModal.hide();
//   };

//   // Open the login modal
//   $scope.import = function() {
//     $scope.importModal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doImport = function() {
//     console.log('Doing Import', $scope.importData);
//     $http.get("https://api.pinterest.com/v1/boards/"+$scope.importData.username+"/"+$scope.importData.boardname+"/pins/?access_token=Ac5HCX-jeHtTBqSZE87_3Hy7xmATFEs87BUzGXtDEIReRwBBUQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cboard%2Cimage%2Ccreated_at%2Ccreator%2Cattribution%2Cmetadata%2Cmedia%2Ccounts%2Ccolor%2Coriginal_link").then(function(response){
//         console.log(response.data.data);
//         $scope.items = response.data.data;
//         for(i=0;i< $scope.items.length;i++){
//           ItemService.addItem($scope.items[i]);
//         }
//       } 
//     );

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeImport();
//     }, 1000);
//   };

//   // console.log($scope.importData)

  
//   // $scope.playlists = [
//   //   { title: 'Reggae', id: 1 },
//   //   { title: 'Chill', id: 2 },
//   //   { title: 'Dubstep', id: 3 },
//   //   { title: 'Indie', id: 4 },
//   //   { title: 'Rap', id: 5 },
//   //   { title: 'Cowbell', id: 6 }
//   // ];
// })


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


.controller('CollectionsCtrl', function($scope, $http, $state, $ionicPopup) {

  $scope.collections = [];

  $http.get("https://api.pinterest.com/v1/boards/amyilyse/interiors/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
    console.log(response.data.data.creator);

    $scope.collections.push(response.data.data);
  });

  $http.get("https://api.pinterest.com/v1/boards/amyilyse/chic/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
    console.log(response.data.data.image);

    $scope.collections.push(response.data.data);
    
  });

  $scope.addCollectionFromPinterest = function(){

    $scope.data={};
    var addPopup = $ionicPopup.show({
      templateUrl: 'templates/addCollection.html',
      title: 'Add Collection From Pinterest',
      subTitle: 'Input User and Board Name',
      scope: $scope,

      buttons: [
      { text: 'Cancel' }, {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.addUser || !$scope.data.addBoard) {
            console.log("No Add Info");
            //don't allow the user to close unless he enters model...
            e.preventDefault();
          } else {

            $http.get("https://api.pinterest.com/v1/boards/" + $scope.data.addUser + "/" + $scope.data.addBoard + "/?access_token=AX0EL2K3PBu3ZineycN4SYBiZiahFEsiwPji579DEIReRwBBUQAAAAA&fields=id%2Curl%2Cname%2Ccreator%2Cimage").then(function(response){
              console.log(response.data.data);
              $scope.collections.push(response.data.data);
              console.log("Added Collection: " + response.data.data.name);
            });
            
          }
        }
      }]
    });

    addPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };
  
  $scope.viewCollection = function(id) {
    $state.go('app.search');
  }

})

.controller('ItemCtrl', function($scope, $stateParams, ItemService) {
  console.log($stateParams.itemId);
  $scope.itemId = $stateParams.itemId;
  $scope.itemDetails = ItemService.getItem($scope.itemId);
  console.log($scope.itemDetails);
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
});


